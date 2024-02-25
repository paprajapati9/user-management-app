import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../types/user.type';
import { io } from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = environment.baseURL;
  private socket;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.socket = io(this.baseURL, { transports: ['websocket'] });
  }

  getAllUsers(
    query: string,
    order: string,
    sortKey: string,
    offset: number,
    limit: number
  ): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseURL}/user?query=${query}&offset=${offset}&limit=${limit}&order=${order}&sortKey=${sortKey}`
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/user`, user).pipe(
      catchError((error) => {
        this.toastr.error(error.error.message);
        return throwError(
          'Something went wrong while creating user. Please try again later.'
        );
      })
    );
  }

  listenToNotifications(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data: any) => {
        subscriber.next(data);
      });
    });
  }
}
