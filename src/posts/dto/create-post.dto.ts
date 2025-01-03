export class CreatePostDto {
    _id: number;
    titleUz: string;
    contentUz: string;
    slugUz: string;
    titleRu: string;
    contentRu: string;
    slugRu: string;
    photo_url: string;
    photo_urls: Array<string>;
}
