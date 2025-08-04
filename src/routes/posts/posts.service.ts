import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import envConfig from 'src/shared/config';

@Injectable()
export class PostsService {
    constructor(private prismaService: PrismaService) {}
    // Example methods for the PostsService
    getPosts() {
        console.log(envConfig.ACCESS_TOKEN_SECRET);
        return this.prismaService.post.findMany(); // Assuming you have a Post model in your Prisma schema
    }

    createPost(body: any) {
        return this.prismaService.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: body.authorId,
            }
        });
    }

    getPost(id: string) {
        // return this.prismaService.post.findUnique({ where: { id } });
    }

    updatePost(id: string, body: any) {
        // return this.prismaService.post.update({ where: { id }, data: body });
    }

    deletePost(id: string) {
        // return this.prismaService.post.delete({ where: { id } });
    }
}
