"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_gateway_1 = require("./user.gateway");
const fetch_users_dto_1 = require("./dto/fetch-users.dto");
let UserController = class UserController {
    constructor(userService, userGateway) {
        this.userService = userService;
        this.userGateway = userGateway;
    }
    async create(createUserDto) {
        if (createUserDto.password !== createUserDto.confirmPassword) {
            throw new common_1.BadRequestException('Password and ConfirmPassword should be same');
        }
        try {
            const userCreated = await this.userService.create(createUserDto);
            const userInfo = {
                id: userCreated.id,
                email: userCreated.email,
                username: userCreated.username,
                createdAt: userCreated.createdAt,
                dob: userCreated.dob,
            };
            this.userGateway.newUserNotification(userInfo);
            return userInfo;
        }
        catch (error) {
            if (error.keyPattern && error.keyPattern.email) {
                throw new common_1.ConflictException('User with this email already exists');
            }
            throw error;
        }
    }
    async findAll(queryParams) {
        const { query, offset, limit, order, sortKey } = queryParams;
        console.log(queryParams);
        return await this.userService.findUsers(query, offset, limit, order, sortKey);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fetch_users_dto_1.FetchUsersDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_gateway_1.UserGateway])
], UserController);
//# sourceMappingURL=user.controller.js.map