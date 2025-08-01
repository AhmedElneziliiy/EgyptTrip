import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Booking, Tourist } from './components/tourist';

@Injectable({
  providedIn: 'root'
})
export class TouristService {

  touristSubject$ = new ReplaySubject<Tourist>();
  touristDashBoard$ = this.touristSubject$.asObservable();
  deleteBooking(id: string) {
    return this.client.delete<Tourist>(this.baseUrl + 'Bookings/' + id, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).pipe(tap(e => {
      this.touristDashBoard$.subscribe(
        (t) => {
          t.bookings = t.bookings.filter((x) => x.bookingID != id);
        }
      )
    }));
  }

  baseUrl = 'https://fizo.runasp.net/api/'

  constructor(private client: HttpClient) { }

  getTourist() {
    this.client.get<Tourist>(this.baseUrl + 'Dashboard/tourist', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }).subscribe((e) => this.touristSubject$.next(e));
  }

  editProfile(tourist: Tourist): Observable<Object> {
    return this.client.put<Object>(this.baseUrl + 'Dashboard/profile', {
      firstName: tourist.name.split(' ')[0],
      lastName: tourist.name.split(' ')[1],
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }

  editBooking(booking: Booking): Observable<Booking> {
    return this.client.put<Booking>(this.baseUrl + 'Bookings/' + booking.bookingID, booking, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }

  getBooking(id: string): Observable<Booking> {
    return this.client.get<Booking>(this.baseUrl + 'Bookings/' + id, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  }
}
