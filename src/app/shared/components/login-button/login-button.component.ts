import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(public jwtAuthService: JwtAuthService) { }

  ngOnInit(): void {
  }

  loginWithRedirect(): void {
    this.jwtAuthService.signin();
  }

}
