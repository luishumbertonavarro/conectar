import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const passwordValid = await bcrypt.compare(pass, user.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        return user;
    }

    async register(userDto: CreateUserDto): Promise<User> {
        const existingUser = await this.usersService.findByEmail(userDto.email);
        if (existingUser) {
            throw new BadRequestException('Email already registrado');
        }

        return this.usersService.create({
            ...userDto,
            role: 'user', // rol por defecto
        });
    }
    async login(user: User) {
        await this.usersService.update(user.id, { lastLoginAt: new Date() });

        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}