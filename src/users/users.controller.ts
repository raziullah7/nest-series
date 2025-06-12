import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

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
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }

    @Post()     // POST /users
    create(@Body() user: {name: string, email: string, role: 'INTERN'|'ENGINEER'|'ADMIN'}) {
        return this.usersService.create(user)
    }

    @Patch(':id')   // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: {name?: string, email?: string, role?: 'INTERN'|'ENGINEER'|'ADMIN'}) {
        return this.usersService.update(+id, userUpdate)
    }

    @Delete(':id')  // DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id)
    }
}
