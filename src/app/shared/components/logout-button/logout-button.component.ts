import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(public jwtAuthService: JwtAuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.jwtAuthService.signout();
  }



}
