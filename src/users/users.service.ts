import { Injectable } from '@nestjs/common';
import { filter } from 'rxjs';

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
        }
        if (name) {
            filteredUsers = filteredUsers.filter(user => 
                user.name.toLowerCase().includes(name.toLowerCase()))
        }

        // then return the filteredUsers
        return filteredUsers
    }

    
}
