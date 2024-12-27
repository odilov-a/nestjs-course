import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) { }

  async getAllPosts(): Promise<{ message: string; data: Post[] }> {
    const posts = await this.postModel.find();
    return { message: 'Successfully fetched all posts', data: posts };
  }

  async getPostById(id: string): Promise<{ message: string; data: Post }> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return { message: 'Successfully fetched the post', data: post };
  }

  async createPost(createPostDto: CreatePostDto): Promise<{ message: string; data: Post }> {
    const newPost = new this.postModel(createPostDto);
    const savedPost = await newPost.save();
    return { message: 'Successfully created a new post', data: savedPost };
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<{ message: string; data: Post }> {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return { message: 'Successfully updated the post', data: updatedPost };
  }

  async deletePost(id: string): Promise<{ message: string; data: Post }> {
    const deletedPost = await this.postModel.findByIdAndDelete(id);
    if (!deletedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return { message: 'Successfully deleted the post', data: deletedPost };
  }
}
