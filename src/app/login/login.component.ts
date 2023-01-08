import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GetPackageService, LoginResponse } from '../services/get_package.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token: string = "";
  error: boolean = false;

  constructor(
    private router: Router,
    private gpService: GetPackageService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    if (this.cookieService.get("Token") != "") {
      this.router.navigate(['order-delivery']);
    }
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    const loginObservable: Observable<LoginResponse> = this.gpService.login(email, password);
    loginObservable.subscribe(response => {
      switch (response.res) {
        case "unknown request":
          this.error = true;
          break;
        default:
          this.error = false;
          this.cookieService.set("Token", response.token);
          this.router.navigate(['order-delivery']);
      }
    });
  }
}
