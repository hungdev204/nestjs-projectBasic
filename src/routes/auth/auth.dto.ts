import { Exclude, Type } from "class-transformer";
import { IsString } from "class-validator";
import { SuccessResDto } from "src/shared/shared.dto";

export class LoginBodyDto {
    @IsString()
    email: string;
    @IsString()
    password: string;
}

export class RegisterBodyDto extends LoginBodyDto {
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsString({ message: 'Confirm Password must be a string' })
    confirmPassword: string;
}

// export class RegisterResDto {
//     id: number;
//     email: string;
//     name: string;
//     @Exclude() password: string;
//     createdAt: Date
//     updatedAt: Date

//     // @Expose()
//     // get emailName() {
//     //     return `${this.email} -${this.name}`
//     // }
//     constructor(partial: Partial<RegisterResDto>) {
//         Object.assign(this, partial);
//     }
// }
export class RegisterResDto extends SuccessResDto{
    @Type(() => RegisterResDto)
    data: RegisterResDto;

    constructor(partial: Partial<RegisterResDto>) {
        super(partial)
        Object.assign(this, partial);
    }
}