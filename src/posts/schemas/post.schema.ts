import { Model } from 'mongoose';
import { Counter } from '../../counter/schemas/counter.schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, _id: false })
export class Post {
    @Prop()
    _id: number;

    @Prop()
    titleUz: string;

    @Prop()
    contentUz: string;

    @Prop()
    slugUz: string;

    @Prop()
    titleRu: string;

    @Prop()
    contentRu: string;

    @Prop()
    slugRu: string;

    @Prop()
    photo_url: string;

    @Prop()
    photo_urls: Array<string>;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counterModel = this.$model('Counter') as Model<Counter>;
        const counter = await counterModel.findByIdAndUpdate(
            'posts',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        if (counter) {
            this._id = counter.seq;
        }
    }
    next();
});