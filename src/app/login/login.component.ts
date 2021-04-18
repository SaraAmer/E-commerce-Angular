import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errors =[];
 
   
    constructor(private _authservice : AuthService ,  private _router: Router) { 
  }

  ngOnInit(): void {

    this._authservice.authSubjectObservable.subscribe((data:Boolean)=>{
      console.log(data)
    })
  }
    loginForm = new FormGroup({
    name: new FormControl('' ,[Validators.required , Validators.minLength(3) ]),
    password: new FormControl('' , [Validators.required ]),
  });
  submit(form: FormGroup)
  {  
    if(form.valid){
  
      // this._authservice.broadcastAuthValue(true);
      this._authservice.broadcastUser(form.value.name)
      this._router.navigate(['products'])
      

    }
 
  }

}
