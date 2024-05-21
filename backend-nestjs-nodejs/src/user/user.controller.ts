import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users') //route group
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      await this.userService.create(
        createUserDto,
      );

      return {
        success: true,
        message: 'Utilisateur créé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data =
        await this.userService.findAll();
      return {
        success: true,
        data,
        message: 'Utilisateurs récupérés avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(
        +id,
      );
      return {
        success: true,
        data,
        message: 'Utilisateur récupéré avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.userService.update(
        +id,
        updateUserDto,
      );
      return {
        success: true,
        message: "L'utilisateur a été mis à jour avec succès",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
      return {
        success: true,
        message: 'Utilisateur supprimé avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
