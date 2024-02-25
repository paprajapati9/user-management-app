import { Component, Input } from "@angular/core";
import { User } from "../types/user.type";

@Component({
    selector: 'app-user-card-dumb',
    templateUrl: './user-card-dumb.component.html',
    styleUrls: ['./user-card-dumb.component.css'],
    standalone: true,
})
export class UserCardDumbComponent {
    @Input() user!: User
}