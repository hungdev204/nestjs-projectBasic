import { Exclude, Type } from "class-transformer";
import { IsString } from "class-validator";
import { SuccessResDto } from "src/shared/shared.dto";

export class LoginBodyDto {
    @IsString()
    email: string;
    @IsString()
    password: string;
}

export class LoginResDto {
    accessToken: string;
    refreshToken: string;

    constructor(partial: Partial<LoginResDto>) {
        Object.assign(this, partial);
    }
}

export class RegisterBodyDto extends LoginBodyDto {
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsString({ message: 'Confirm Password must be a string' })
    confirmPassword: string;
}

export class RegisterResDto extends SuccessResDto{
    @Type(() => RegisterResDto)
    data: RegisterResDto;

    constructor(partial: Partial<RegisterResDto>) {
        super(partial)
        Object.assign(this, partial);
    }
}