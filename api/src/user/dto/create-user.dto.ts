import { IsDate, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;

    @IsEmail()
    email: string;

    @IsDate()
    dob: Date;
}
