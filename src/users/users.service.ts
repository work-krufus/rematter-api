import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { getFileNameInformation } from 'src/utils/getFilenameInformation';
import * as Tesseract from 'tesseract.js';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  async getAllUsers() {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw e;
    }
  }

  getCardData(text: string) {
    const lines = text.split('\n');
    if (lines.length >= 8) {
      const name = lines[5];
      const dlExpiryDate =
        lines[2]?.substring(lines[2].indexOf('exe') + 4).trim() ||
        lines[2]?.substring(lines[2].indexOf('exp') + 4).trim() ||
        '';
      const address = lines[6] + lines[7];

      return {
        name,
        address,
        dlExpiryDate,
      };
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const imageBuffer = getFileNameInformation(createUserDto.idCardPicture);

      const result = await Tesseract.recognize(imageBuffer, 'eng');

      const { name, address, dlExpiryDate } = this.getCardData(
        result.data.text,
      );

      if (name && address && dlExpiryDate) {
        const userToCreate = this.userRepository.create({
          name,
          address,
          dlExpiryDate,
        });

        const newUser = this.userRepository.save(userToCreate);
        return newUser;
      }

      throw new HttpException(
        `Couldn't extract data properly or the image is wrong`,
        HttpStatus.BAD_REQUEST,
      );
    } catch (e) {
      throw e;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(id);

      const updatedUser = await this.userRepository.update(id, updateUserDto);

      if (!updatedUser.affected) {
        throw new HttpException('User not updated', HttpStatus.BAD_REQUEST);
      }

      return await this.findOne(id);
    } catch (e) {
      throw e;
    }
  }

  async delete(id: number) {
    try {
      await this.findOne(id);

      const deletedUser = await this.userRepository.delete(id);

      if (!deletedUser.affected) {
        throw new HttpException(
          'Could not delete user',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { message: 'User is deleted' };
    } catch (e) {
      throw e;
    }
  }
}
