import { TouristNavBarModule } from './../tourist-navbar/tourist-navbar.module';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Booking } from '../tourist';
import { TouristService } from '../../tourist.service';
import { AlertDialogComponent } from '../../../alert-dialog-component/alert-dialog-component';
import { TouristNavbarComponent } from '../tourist-navbar/tourist-navbar.component';

@Component({
  selector: 'app-edit-booking',
  imports: [MatProgressSpinner, FormsModule],
  providers: [TouristNavbarComponent],
  templateUrl: './edit-booking.component.html',
  styleUrl: './edit-booking.component.scss'
})
export class EditBookingComponent implements OnInit {

  id!: string;

  isBookingReqFinished = false;

  booking!: Booking;

  service = inject(TouristService);

  constructor(private route: ActivatedRoute, private matDialog: MatDialog) { }
  ngOnInit(): void {
    this.route.data.subscribe({
      next: (value) => {
        this.id = value['id'];
        console.log('in data ' + this.id)
        this.service.getBooking(this.id).subscribe(
          {
            next: (value) => {
              this.isBookingReqFinished = true;
              this.booking = value;
              console.log(this.booking);
              let date = new Date(this.booking.bookingDate).toISOString().substring(0, 10);
              console.log('date : ' + date);

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
        this.service.getBooking(this.id);
      },
    });
  }

  saveData() {
    this.service.editBooking(this.booking).subscribe({
      next: (value) => {
        this.booking = value;
        this.matDialog.open(AlertDialogComponent, {
          data: {
            title: 'TripLin',
            message: 'Booking Updated Successfully!'
          }
        });
      },
      error: (err: string) => {
        console.log(err);
      },
    });
  }

  get BookingDate(): string {
    let date: Date = new Date(this.booking.bookingDate);
    return date.toISOString().substring(0, 10);
  }

  set BookingDate(date: string) {
    const d = new Date(date);
    d.setHours(12, 0, 0, 0);
    this.booking.bookingDate = d.toISOString();
  }
}
