import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../types/user.type';
import { UserCardDumbComponent } from '../components/user-card-dumb.component';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { MatOptionModule } from '@angular/material/core';

interface FiltersForm {
  query: string;
  order: string;
  sortKey: string;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    UserCardDumbComponent,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  limit = 10;
  query: string = '';
  filtersForm!: FormGroup;
  sortKeys = [
    { value: 'createdAt', viewValue: 'Created At' },
    { value: 'username', viewValue: 'Name' },
    { value: 'email', viewValue: 'Email' },
  ];

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filtersForm = this.formBuilder.group({
      query: [''],
      order: ['desc'],
      sortKey: ['createdAt'],
    });

    this.loadUsers();
    this.userService
      .listenToNotifications('newUserAdded')
      .subscribe((data: User) => {
        // Show new user notification
        this.toastr.info('New User ' + data.username + ' added', '', {
          positionClass: 'toast-bottom-left',
        });
        this.users = [];
        this.loadUsers();
      });

    this.filtersForm.valueChanges
      .pipe(
        debounceTime(300),
        // Only perform query when any of the filters have changed
        distinctUntilChanged((prev, curr) => {
          return (
            prev.query === curr.query &&
            prev.order === curr.order &&
            prev.sortKey === curr.sortKey
          );
        }),
        switchMap((filters: FiltersForm) => {
          return this.userService.getAllUsers(
            filters.query,
            filters.order,
            filters.sortKey,
            0,
            this.limit
          );
        })
      )
      .subscribe((users) => (this.users = users));
  }

  loadUsers(offset: number = 0): void {
    const query = this.filtersForm.controls['query'].value;
    const order = this.filtersForm.controls['order'].value;
    const sortKey = this.filtersForm.controls['sortKey'].value;
    this.userService
      .getAllUsers(query, order, sortKey, offset, this.limit)
      .subscribe((users) => {
        this.users.push(...users);
      });
  }

  onScroll() {
    this.loadUsers(this.users.length); // Load more users when scrolled to the bottom
  }
}
