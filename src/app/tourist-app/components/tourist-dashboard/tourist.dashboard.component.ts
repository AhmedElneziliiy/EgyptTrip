import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { MatDialog } from '@angular/material/dialog';
import { DeleteBookingComponent } from './delete-booking/delete-booking.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Booking, Tourist } from '../tourist';
import { TouristService } from '../../tourist.service';
import { NavbarComponent } from "../../../shared-app/Components/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  imports: [MatProgressSpinner, RouterLink, CommonModule, NavbarComponent],
  templateUrl: './tourist.dashboard.component.html',
  styleUrl: './tourist.dashboard.component.scss'
})
export class TouristDashboardComponent implements OnInit {

  tourist!: Tourist;

  isTouristReq = false;

  constructor(private matDialog: MatDialog, private service: TouristService) { }

  ngOnInit(): void {
    this.service.touristDashBoard$.subscribe(
      {
        next: (value) => {
          console.log('in here!');
          this.isTouristReq = true;
          this.tourist = value;
          console.log(value);
        },
      }
    );
    this.service.getTourist();
  }

  openDeleteDialog(id: string) {
    this.matDialog.open(DeleteBookingComponent, {
      data: { id: id }
    });
  }

  print(item: Booking) {
    console.log(item.bookingID)
  }
}
