import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { LoginService } from './login.service';

@Component
({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit 
{
  registerForm!: FormGroup;
  submitted = false;
  ProntoPerInviare=false;
  
  constructor(private formBuilder: FormBuilder,
    private service: LoginService) 
  {
    
  }
//--------------------------------------------------------------------------------
  ngOnInit(): void 
  {
      this.registerForm = this.formBuilder.group
      ({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }
//--------------------------------------------------------------------------------
  get f() { return this.registerForm.controls; }
//--------------------------------------------------------------------------------
  onSubmit() 
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) 
    {
      this.ProntoPerInviare=false;  
       return;
    }
    else
    {
      this.ProntoPerInviare=true;
    }
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
//--------------------------------------------------------------------------------
  Login(Email:string,Password:string)
  {
    
    this.onSubmit();
    if(this.ProntoPerInviare===true)
    {
      if(Email.length<=0 || Password.length<=0 || Password.length<=5)
      {
        alert("Inserisci Email e Password!");
      }
      else
      {
        Email=Email.toLowerCase();
        Password=Password.toLowerCase();
        this.service.LoginPassword(Email,Password).subscribe
        (
          res => 
          {
            alert(res);
            //salvo il token sul browser!
            localStorage.setItem('tokenLogin',res.toString());
            //per vederlo: F12->Application
          }, 
          err => 
          {
            alert(err);
          }
        )  ;
      }
    }
    else
    {
      alert("Ci sono degli errori nella form!!\nControlla bene Email e Password!!");
    }
  }
//--------------------------------------------------------------------------------
  Registrati(Email:string,Password:string)
  {
    this.onSubmit();
    if(this.ProntoPerInviare===true)
    {
      if(Email.length<=0 || Password.length<=0 || Password.length<=5)
      {
        alert("Inserisci Email e Password!");
      }
      else
      {
        Email=Email.toLowerCase();
        Password=Password.toLowerCase();
        this.service.Registra(Email,Password);
      }
    }
    else
    {
      alert("Ci sono degli errori nella form!!\nControlla bene Email e Password!!");
    }
  }
//--------------------------------------------------------------------------------
}
