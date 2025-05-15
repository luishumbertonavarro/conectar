import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
    Request,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Crear usuario (puede que lo uses solo desde /auth/register, pero se deja aquí por si acaso)
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    // Listar todos (esto debería ser solo para admins más adelante)
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }
    // Obtener perfil del usuario autenticado
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.usersService.findOne(req.user.userId);
    }

    // Obtener un usuario por ID (uso interno, solo admins)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    // Actualizar un usuario por ID (uso interno, solo admins)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(id, dto);
    }

    // Eliminar usuario (solo admins)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }



    // Actualizar perfil del usuario autenticado
    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    updateProfile(@Request() req, @Body() dto: UpdateUserDto) {
        return this.usersService.update(req.user.userId, dto);
    }
}
