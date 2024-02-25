import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { IUser } from "./models/user.model";

@WebSocketGateway()
export class UserGateway {
    @WebSocketServer()
    server: Server;

    newUserNotification(user: IUser) {
        console.log(user);
        // Emit new user added notification
        this.server.emit('newUserAdded', user);
    }
}