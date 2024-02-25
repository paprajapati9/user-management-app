import { Server } from "socket.io";
import { IUser } from "./models/user.model";
export declare class UserGateway {
    server: Server;
    newUserNotification(user: IUser): void;
}
