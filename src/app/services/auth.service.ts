import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private _authSubject = new BehaviorSubject<boolean>(false);
  private _userName = new BehaviorSubject<string>(localStorage.getItem('loginUser'));

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
    if(localStorage.getItem('loginUser'))
    {
      return true;

    }
    else{
      return false;
    }
    // return this._authSubject.value;
  }
  get isUserName(): string {
    return this._userName.value;
  }
  broadcastUser(value: string){
    this._userName.next(value);
 
    localStorage.setItem('loginUser' , value)
  }
  get loginName():Observable<string> {
  
      return this._userName.asObservable();
    
  }


}