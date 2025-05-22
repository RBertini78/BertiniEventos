import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, BsDropdownModule, CollapseModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit(): void{    
  }

  showMenu(): boolean {
    return this.router.url !== '/user/login' && this.router.url !== '/user/registration';
  }
}
