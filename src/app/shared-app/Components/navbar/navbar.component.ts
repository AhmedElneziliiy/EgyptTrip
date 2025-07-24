import { CommonModule } from '@angular/common';
import { Component, ElementRef, viewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ CommonModule , RouterModule , RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
mobiletoggle = viewChild<ElementRef<HTMLButtonElement>>('mobileToggle');
mobileMenu = viewChild<ElementRef<HTMLDivElement>>('mobileMenu');
  overlay = viewChild<ElementRef<HTMLDivElement>>('overlay');

  isMenuActive: boolean = false;

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  closeMenu(): void {
    this.isMenuActive = false;
  }
}
