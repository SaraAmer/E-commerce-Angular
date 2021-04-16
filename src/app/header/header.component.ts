import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
name = localStorage.getItem('loginUser');

  constructor(public _loginservice : AuthService , private _router: Router) {
 
   }

  ngOnInit(): void {
   this._loginservice.authUser.subscribe((data : string)=>{
     this.name = data
      console.log(data)
    })
  }
logout()
{
  this._router.navigate(['/products'])
   localStorage.removeItem('loginUser');
   this._loginservice.broadcastUser("");
   this._loginservice.broadcastAuthValue(false)
  
   
   
}
}
