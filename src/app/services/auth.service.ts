import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private _authSubject = new BehaviorSubject<boolean>(false);
  private _userName = new BehaviorSubject<string>("");

  get authSubjectObservable(): Observable<boolean> {
    return this._authSubject.asObservable();
  }
  get authUser():Observable<string>{
    return this._userName.asObservable();
  }

  broadcastAuthValue(value: boolean): void {
    this._authSubject.next(value);
    
  }

  get isLoggedIn(): boolean {
    return this._authSubject.value;
  }
  get isUserName(): string {
    return this._userName.value;
  }
  broadcastUser(value: string){
    this._userName.next(value);
    console.log(value)
    localStorage.setItem('loginUser' , value)
  }
  get loginName():Observable<string> {
  
      return this._userName.asObservable();
    
  }


}