import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    lastLoginAt?: Date;
}
