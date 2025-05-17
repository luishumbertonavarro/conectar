import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }


    async findAll(options?: {
        role?: string;
        sortBy?: 'name' | 'createdAt';
        order?: 'asc' | 'desc';
        page?: number;
        limit?: number;
    }) {
        const query = this.usersRepository.createQueryBuilder('user');

        if (options?.role) {
            query.andWhere('user.role = :role', { role: options.role });
        }

        if (options?.sortBy) {
            const order = options.order === 'desc' ? 'DESC' : 'ASC';
            query.orderBy(`user.${options.sortBy}`, order);
        }

        const page = options?.page || 1;
        const limit = options?.limit || 10;

        query.skip((page - 1) * limit).take(limit);

        const [data, total] = await query.getManyAndCount();

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        console.log('Email recibido en findByEmail:', email);
        const user = await this.usersRepository.findOne({ where: { email } });
        console.log('Usuario encontrado en findByEmail:', user);
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('User not found');
    }
}
