import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  // making a dependency injection
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto
    })
  }

  async findAll(role?: 'INTERN'|'ENGINEER'|'ADMIN') {
    // if the query param is passed as argument
    if (role) {
      return this.databaseService.employee.findMany({
        where: {  role, }
      })
    }
    // if the query param is not passed
    return this.databaseService.employee.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {  id, }
    })
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {  id, },
      data: updateEmployeeDto
    })
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {  id, }
    })
  }
}
