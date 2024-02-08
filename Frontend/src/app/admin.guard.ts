import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const adminToken = localStorage.getItem('AdminToken');
    if (adminToken) {
      return true;
    } else {
      this.router.navigate(['admin/login']);
      return false; 
    }
  }
}
