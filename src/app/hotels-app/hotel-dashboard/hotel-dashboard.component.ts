import { Component, inject, OnInit } from '@angular/core';
import { HotelsService } from '../hotels-service.service';
import { HotelDashBoard } from '../interfaces/hotel-dashboard';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from '../../alert-dialog-component/alert-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotel-dashboard',
  imports: [MatProgressSpinner, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './hotel-dashboard.component.html',
  styleUrl: './hotel-dashboard.component.scss'
})
export class HotelDashboardComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  service = inject(HotelsService);

  isHotelReqFinished = false;

  hotelDashBoard!: HotelDashBoard;
  ngOnInit(): void {
    this.service.hotelDashBoard$.subscribe(
      {
        next: (value) => {
          this.hotelDashBoard = value;
          this.isHotelReqFinished = true;
        },
        error: (err) => {
          let message = '';
          err['error']['errors'].map((e: string) => message += e + '\n');
          this.matDialog.open(AlertDialogComponent, {
            data: {
              title: 'Error',
              message: message
            }
          });
        },
      }
    );
    this.service.getHotelDashBoard();
  }

}
