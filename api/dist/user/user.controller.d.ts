import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserGateway } from './user.gateway';
import { FetchUsersDto } from './dto/fetch-users.dto';
import { IUser } from './models/user.model';
export declare class UserController {
    private readonly userService;
    private readonly userGateway;
    constructor(userService: UserService, userGateway: UserGateway);
    create(createUserDto: CreateUserDto): Promise<IUser>;
    findAll(queryParams: FetchUsersDto): Promise<IUser[]>;
}
