import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findUsers(
    searchQuery: string,
    offset: number,
    limit: number,
    order: string,
    sortKey: string
  ): Promise<IUser[]> {
    const query = {};

    // If a search query is provided, add it to the query
    if (searchQuery) {
      query['$or'] = [
        { username: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    const sortDirection = order === 'asc' ? 1 : -1;

    // Perform the MongoDB aggregation
    return this.userModel
      .aggregate([
        { $match: query }, // Filter based on search query
        { $skip: offset }, // Skip records based on offset
        { $limit: limit as number }, // Limit the number of records
        {
          $sort: {
            [sortKey]: sortDirection,
          },
        },
        {
          $unset : 'password' // Remove password from fetched data
        }
      ])
      .exec();
  }
}
