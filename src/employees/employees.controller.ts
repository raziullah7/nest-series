import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from 'generated/prisma';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()   // no rate limiting applied
@Controller('employees')
export class EmployeesController {
  // dependency injection of EmployeeService
  constructor(private readonly employeesService: EmployeesService) {}

  // adding MyLoggerService for logs
  private readonly logger = new MyLoggerService(EmployeesController.name)

  // constructor(
  //   private readonly employeesService: EmployeesService,
  //   private readonly logger: MyLoggerService
  // ) {
  //   this.logger.setContext(EmployeesController.name);
  // }

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false })   // applies the rate limiting
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: 'INTERN'|'ENGINEER'|'ADMIN') {
    this.logger.log(`Request for ALL Employees\t${ip}`, EmployeesController.name)
    return this.employeesService.findAll(role);
  }

  @Throttle({short: {ttl: 1000, limit: 1}}) // override the previous 'short' conditions
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
