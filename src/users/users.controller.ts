import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    // DI in the UsersService, Nest JS manages it to be a singleton
    constructor(private readonly usersService: UsersService) {}

    @Get()          // GET /users or    /users?role=value&name=value (query params)
    findAll(
        @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
        @Query('name') name?: 'RAZI' | 'ABDULLAH') {
        return this.usersService.findAll(role, name)
    }

    @Get(':id')     // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Post()     // POST /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Patch(':id')   // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id')  // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }
}
