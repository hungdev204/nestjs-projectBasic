import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LoginBodyDto } from 'src/routes/auth/auth.dto';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TokenService } from '../../shared/services/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly hashingService: HashingService,
        private readonly prismaService: PrismaService,
        private readonly tokenService: TokenService,
    ) {}

    async register(body: any) {
        try {
            const hashedPassword = await this.hashingService.hash(body.password);
            const user = await this.prismaService.user.create({
                data: {
                    email: body.email,
                    password: hashedPassword,
                    name: body.name,
                },
            });
            return {
                user
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }

    async login(body: LoginBodyDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (!user) {
            throw new ConflictException('User not found');
        }

        const isPasswordMatch = await this.hashingService.compare(body.password, user.password);
        if (!isPasswordMatch) {
            throw new UnprocessableEntityException([
                {
                    field: 'password',
                    message: 'Password is incorrect'
                }
            ])
        }
        const tokens = await this.generateTokens({ userId: user.id });
        return tokens;
    }

    async generateTokens(payload:{userId: number} ) {
        const [accessToken, refreshToken] = await Promise.all([
            this.tokenService.signAccessToken(payload),
            this.tokenService.signRefreshToken(payload),
        ])
        const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken);
        await this.prismaService.refreshToken.create({
            data: {
                userId: payload.userId,
                token: refreshToken,
                expiresAt: new Date(decodedRefreshToken.exp * 1000),
            },
        });
        return {
            accessToken,
            refreshToken
        };
    }
}

