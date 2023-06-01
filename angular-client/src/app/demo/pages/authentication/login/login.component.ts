import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) {
    
  }

  ngOnInit(): void {
    this.authenticationService.getAllUsers().subscribe(res=>console.log('res', res))
  }

}
