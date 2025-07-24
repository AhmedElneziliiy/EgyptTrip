import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Destination, Package } from '../interfaces/package';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlertDialogComponent } from '../../alert-dialog-component/alert-dialog-component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-package',
  imports: [RouterModule, FormsModule, MatProgressSpinner],
  templateUrl: './edit-package.component.html',
  styleUrl: './edit-package.component.scss',
})
export class EditPackageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: CompanyService, private matDialog: MatDialog) { }

  destinations: Destination[] = [];

  photos: File[] = [];

  ngOnInit(): void {
    this.service.destinations$.subscribe(
      {
        next: (val) => {
          this.destinations = val;
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
    this.route.data.subscribe(
      (complete) => {
        this.packageId = complete['package'];
        this.service.getPackageById(this.packageId).subscribe(
          {

            next: (val) => {
              this.package = val;
              this.package.destinationIds = [];
              this.package.destinationIds = this.package.destinations?.map(d => d.destinationId);
              console.log(this.package.destinationIds);

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
            }
          }
        )
      }
    );
    this.service.getDestinations();
  }

  packageId!: string;

  package!: Package;

  saveData() {
    const formData = new FormData();
    formData.append('PackageName', this.package.packageName);
    formData.append('Description', this.package.description);
    formData.append('Price', this.package.price);
    formData.append('DurationDays', this.package.durationDays.toString());
    formData.append('StartDate', this.package.startDate);
    formData.append('EndDate', this.package.endDate);
    this.package.destinationIds!.map((e) => {
      formData.append('DestinationIds', e.toString());
    });
    this.photos.map((e) => {
      formData.append('Photos', e);
    });
    this.service.editPackage(formData, this.package.packageId).subscribe({
      next: (value) => {
        console.log(value);
        this.package = value;
        this.package.destinationIds = [];
        console.log(this.package.destinationIds);

        this.package.destinations?.map(e => {
          this.package.destinationIds?.push(e.destinationId);
        });

        this.service.getPackageById(this.package.packageId).subscribe((e) => {
          this.package.photoUrls = e.photoUrls;
        });
        alert("Package Update Successfully");
        this.photos = [];
      },
      error: (err) => {
        let message = '';
        this.matDialog.open(AlertDialogComponent, {
          data: {
            title: 'Error',
            message: 'Check Your Data!'
          }
        });
      },
    });
  }

  isDestinationChecked(id: string) {
    return this.package.destinationIds?.includes(id);
  }

  addOrRemoveDestination(id: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;


    if (checkbox.checked) {
      if (!this.package.destinationIds?.includes(id)) {
        this.package.destinationIds?.push(id);
      }
    } else {
      this.package.destinationIds = this.package.destinationIds?.filter(destId => destId !== id);
    }
  }

  removeImage(photo: string) {
    this.package.photoUrls = this.package.photoUrls?.filter((e) => e != photo);
  }

  addToImages(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files != null && input.files.length > 0) {
      for (let index = 0; index < input.files.length; index++) {
        this.photos.push(input.files[index]);
      }
    }
  }
}
