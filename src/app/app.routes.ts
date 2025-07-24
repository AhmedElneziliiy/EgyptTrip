import { HomeComponent } from './landing-app/Components/home/home.component';
import { TourGuidesComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guides.component';
import { HotelsDetailsComponent } from './client-app/Features/Hotels/main-page/Components/hotels-details/hotels-details.component';
import { AllHotelsComponent } from './client-app/Features/Hotels/main-page/Components/all-hotels/all-hotels.component';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { RegisterComponent } from './landing-app/Components/register/register.component';
import { PackageDetailsComponent } from './client-app/Features/tour-packages/package-details/package-details.component';
import { HotelBookingComponent } from './client-app/Features/Hotels/main-page/Components/hotel-booking/hotel-booking.component';
import { RoomDetailsComponent } from './client-app/Features/Hotels/main-page/Components/room-details/room-details.component';
import { TopTourGuidesComponent } from './client-app/Features/Tour-Guides/tour-guides/top-tour-guides/top-tour-guides.component';
import { TourGuideBookingComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guide-booking/tour-guide-booking.component';
import { TourGuideDetailsComponent } from './client-app/Features/Tour-Guides/tour-guides/tour-guide-details/tour-guide-details.component';
import { PackageBookingComponent } from './client-app/Features/tour-packages/package-booking/package-booking.component';
import { TourPackagesComponent } from './client-app/Features/tour-packages/tour-packages.component';
import { HotelDetailsComponent } from './tourist-app/components/hotel-details/hotel-details.component';
import { HotelOffersComponent } from './tourist-app/components/hotel-offers/hotel-offers.component';
import { TourGuideOffersComponent } from './tourist-app/components/tour-guide-offers/tour-guide-offers.component';
import { TouristMessagesComponent } from './tourist-app/components/tourist-messages/tourist-messages.component';
import { TouristTripsComponent } from './tourist-app/components/tourist-trips/tourist-trips.component';
import { TourGuidesMainComponent } from './tour-guides-app/tour-guides-component/tour-guides-component.component';
import { HotelComponent } from './hotels-app/hotel-component/hotel-component.component';
import { HotelDashboardComponent } from './hotels-app/hotel-dashboard/hotel-dashboard.component';
import { ManageHotelProfileComponent } from './hotels-app/manager-hotel-profile/manage-hotel-profile.component';
import { OverviewComponent } from './tour-guides-app/overview/overview.component';
import { ManagerTourGuideProfileComponent } from './tour-guides-app/manager-tour-guide-profile/manager-tour-guide-profile.component';
import { CreatePackageComponent } from './tourism-company-app/create-package/create-package.component';
import { EditPackageComponent } from './tourism-company-app/edit-package/edit-package.component';
import { ManageBookingsComponent } from './tourism-company-app/manage-bookings/manage-bookings.component';
import { TourismCompanyComponent } from './tourism-company-app/tourism-company-component/tourism-company-component';
import { CompanyDashboardComponent } from './tourism-company-app/dashboard/dashboard.component';
import { TourGuideRegisterComponent } from './landing-app/Components/register/tour-guide-register/tour-guide-register.component';
import { TouristRegisterComponent } from './landing-app/Components/register/tourist-register/tourist-register.component';
import { HotelRegisterComponent } from './landing-app/Components/register/hotel-register/hotel-register.component';
import { LoginComponent } from './landing-app/Components/login/login.component';
import { AuthGuard } from './landing-app/auth.guard';
import { companyGuard, hotelGuard, tourGuideGuard, touristGuard } from './landing-app/Components/register/role.guard';
import { TouristDashboardComponent } from './tourist-app/components/tourist-dashboard/tourist.dashboard.component';
import { CompanyRegisterComponent } from './landing-app/Components/register/company-register/company-register.component';
import { CreateRoomComponent } from './hotels-app/create-room/create-room.component';
import { ManageRoomsComponent } from './hotels-app/manage-rooms/manage-rooms.component';
import { RoomsTableComponent } from './hotels-app/manage-rooms/rooms-table/rooms-table.component';
import { ManageRoomComponent } from './hotels-app/manage-rooms/manage-room/manage-room.component';
import { EditBookingComponent } from './tourist-app/components/edit-booking/edit-booking.component';
import { TouristComponent } from './tourist-app/components/tourist-component/tourist-component.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Tour Guides', component: TourGuidesComponent },
  { path: 'hotel-reservation', component: AllHotelsComponent },
  { path: 'hotel-details/:hotelId', component: HotelsDetailsComponent },
  { path: 'hotel-booking', component: HotelBookingComponent },
  { path: 'room-details/:roomId', component: RoomDetailsComponent },
  { path: 'tour-guides', component: TourGuidesComponent },
  { path: 'top-tour-guides', component: TopTourGuidesComponent },
  { path: 'tour-guide-details/:guideId', component: TourGuideDetailsComponent },
  { path: 'tourguide-booking', component: TourGuideBookingComponent },
  { path: 'tour-packages', component: TourPackagesComponent },
  { path: 'package-details/:packageId', component: PackageDetailsComponent },
  { path: 'package-booking/:packageId', component: PackageBookingComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register/company', component: CompanyRegisterComponent,
  },
  {
    path: 'register/guide', component: TourGuideRegisterComponent,
  },
  {
    path: 'register/hotel', component: HotelRegisterComponent,
  },
  {
    path: 'register/tourist', component: TouristRegisterComponent,
  },
  {
    path: 'tourist',
    component: HomeComponent,
    canActivate: [AuthGuard, touristGuard],
    children: [
      { path: 'trips', component: TouristTripsComponent, title: 'Tourist Trips' },
      { path: 'messages', component: TouristMessagesComponent, title: 'Tourist Messages' },
      { path: 'hotel-offers', component: HotelOffersComponent, title: 'Tourist Offers' },
      { path: 'hotel-details/:hotelId', component: HotelDetailsComponent, title: 'Tourist Hotel Details' },
      { path: 'dashboard/guide-offers', component: TourGuideOffersComponent, title: 'Tourist Offers' },
    ]
  },
  { path: 'tourist/dashboard', component: TouristDashboardComponent, title: 'Tourist DashBoard' },
  {
    path: 'tourist/dashboard/edit-booking/:id', component: EditBookingComponent, title: 'Edit Booking', resolve: {
      id: (route: ActivatedRouteSnapshot) => {
        return route.paramMap.get('id');
      }
    }
  },

  {
    path: 'tour-guide',
    component: TourGuidesMainComponent,
    canActivate: [AuthGuard, tourGuideGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: OverviewComponent, title: 'TourGuide DashBoard' },
      { path: 'profile', component: ManagerTourGuideProfileComponent, title: 'Manage Profile' },
    ]
  },
  {
    path: 'company',
    component: TourismCompanyComponent,
    canActivate: [AuthGuard, companyGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CompanyDashboardComponent, title: 'Company DashBoard' },
      { path: 'new-package', component: CreatePackageComponent, title: 'Create Package' },
      {
        path: 'edit-package/:id', component: EditPackageComponent, title: 'Edit Package', resolve: {
          package: (route: ActivatedRouteSnapshot) => {
            return route.paramMap.get('id');
          }
        }
      },
      { path: 'bookings', component: ManageBookingsComponent, title: 'Manage Bookings' },
    ]
  },
  {
    path: 'hotel',
    component: HotelComponent,
    canActivate: [AuthGuard, hotelGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HotelDashboardComponent, title: 'Hotel DashBoard' },
      { path: 'profile', component: ManageHotelProfileComponent, title: 'Manage Profile' },
      { path: 'new-room', component: CreateRoomComponent, title: 'Manage Profile' },
      { path: 'rooms', component: RoomsTableComponent, title: 'Manage Rooms' },
      {
        path: 'rooms/:id', component: ManageRoomComponent, title: 'Manage Room', resolve: {
          id: (route: ActivatedRouteSnapshot) => {
            return route.paramMap.get('id');
          }
        }
      },
    ]
  },
  { path: '**', redirectTo: 'tour-guides' }
];
