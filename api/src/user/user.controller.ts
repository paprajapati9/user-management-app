import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ValidationPipe,
  ConflictException,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserGateway } from './user.gateway';
import { FetchUsersDto } from './dto/fetch-users.dto';
import { IUser } from './models/user.model';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userGateway: UserGateway,
  ) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto, 'create');

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException(
        'Password and ConfirmPassword should be same',
      );
    }

    try {
      const userCreated = await this.userService.create(createUserDto);

      const userInfo: IUser = {
        id: userCreated.id,
        email: userCreated.email,
        username: userCreated.username,
        createdAt: userCreated.createdAt,
        dob: userCreated.dob,
      };

      // Broadcast new user creation notification
      this.userGateway.newUserNotification(userInfo);

      return userInfo;
    } catch (error) {
      if (error.keyPattern && error.keyPattern.email) {
        // If email already exists, throw ConflictException
        throw new ConflictException('User with this email already exists');
      }
      // For other errors, rethrow them
      throw error;
    }
  }

  @Get()
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    queryParams: FetchUsersDto,
  ) {
    const { query, offset, limit, order, sortKey } = queryParams;
    console.log(queryParams);
    return await this.userService.findUsers(
      query,
      offset,
      limit,
      order,
      sortKey,
    );
  }
}
