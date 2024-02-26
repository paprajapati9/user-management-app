import { Component, Input } from "@angular/core";
import { User } from "../types/user.type";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-user-card-dumb',
    templateUrl: './user-card-dumb.component.html',
    styleUrls: ['./user-card-dumb.component.css'],
    standalone: true,
    imports: [
        MatIconModule
    ]
})
export class UserCardDumbComponent {
    @Input() user!: User
}