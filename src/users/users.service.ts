import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Razi",
            "email": "razi@email.com",
            "role": "INTERN"
        },
        {
            id: 2,
            name: "Sarah",
            email: "sarah@email.com",
            role: "ENGINEER"
        },
        {
            id: 3,
            name: "Alex",
            email: "alex@email.com",
            role: "ADMIN"
        },
        {
            id: 4,
            name: "Jordan",
            email: "jordan@email.com",
            role: "INTERN"
        },
        {
            id: 5,
            name: "Taylor",
            email: "taylor@email.com",
            role: "ENGINEER"
        }
    ]

    // SERVICE method to get all users
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN', name?: string) {
        // // if role or name exists, then its a query parameter request
        // if (role && name) {
        //     return this.users.filter(user => user.role === role && user.name === name)
        // }
        // else if (role) {
        //     return this.users.filter(user => user.role === role)
        // }
        // else if (name) {
        //     return this.users.filter(user => user.name === name)
        // }
        // // otherwise its a normal request to get all users
        // return this.users

        // make a copy to avoid mutation
        let filteredUsers = [...this.users];

        // apply filters only when a query param is provided
        if (role) {
            filteredUsers = filteredUsers.filter(user => user.role === role)
            if (filteredUsers.length === 0){
                throw new NotFoundException("User role not found")
            } 
        }

        if (name) {
            filteredUsers = filteredUsers.filter(user => 
                user.name.toLowerCase().includes(name.toLowerCase()))
            if (filteredUsers.length === 0){
                throw new NotFoundException("User name not found")
            } 
        }

        // then return the filteredUsers
        return filteredUsers
    }

    // find 1 user
    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) throw new NotFoundException("User not found")

        return user
    }

    // create a user
    create(createUserDto: CreateUserDto) {
        // as there is no autoincrement here, 
        // we find the highest id and +1 it for new id
        // sorting in descending order
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)

        // making the new user now
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }

        // adding the new user to the list
        this.users.push(newUser)
        return newUser
    }

    // update a user
    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => 
            (user.id === id) ? {...user, ...updateUserDto} : user
        )
        // return the updated user
        return this.findOne(id)
    }

    // delete a user
    delete(id: number) {
        // find the user to be removed
        const removedUser = this.findOne(id);

        // throw an exception if not found
        if (!removedUser) {
            throw new NotFoundException(`User is ID ${id} not found`)
        }

        // remove and return the user otherwise
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
