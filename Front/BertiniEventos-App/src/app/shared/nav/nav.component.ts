import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, BsDropdownModule, CollapseModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  isCollapsed = true;
  isLogged = false;

  constructor(public accountService: AccountService,
    private router: Router) {
      router.events.subscribe(
        (val) => {
          if (val instanceof NavigationEnd) {
            this.accountService.currentUser$.subscribe(
              (value) => this.isLogged = value !== null)
            }
          });
    }

  ngOnInit(): void{
    this.accountService.currentUser$.subscribe({
      next: (user) => {
        this.isLogged = !!user;
      },
      error: (error) => console.error(error)
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/user/login');
  }

  showMenu(): boolean {
    return this.router.url !== '/user/login' && this.router.url !== '/user/registration';
  }
}
