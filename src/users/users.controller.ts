import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    try {
      return await this.usersService.getAllUsers();
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(+id);
    } catch (e) {
      throw e;
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.usersService.delete(+id);
    } catch (e) {
      console.log(e);
    }
  }
}
