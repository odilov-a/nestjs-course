export class CreatePostDto {
    _id: number;
    titleUz: string;
    contentUz: string;
    titleRu: string;
    contentRu: string;
    photo_url: string;
    photo_urls: Array<string>;
}
