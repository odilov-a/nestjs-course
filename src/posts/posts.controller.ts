import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  // @Get()
  // findAll() {
  //   return this.postsService.getAllPosts();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postsService.getPostById(id);
  // }

  @Get()
  async getAllPosts(@Query('lang') lang: string) {
    return this.postsService.getAllPosts(lang || 'uz');
  }

  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string, @Query('lang') lang: string) {
    return this.postsService.getPostBySlug(slug, lang || 'uz');
  }

  @Get(':id')
  async getPostById(@Param('id') id: string, @Query('lang') lang: string) {
    return this.postsService.getPostById(id, lang || 'uz');
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
