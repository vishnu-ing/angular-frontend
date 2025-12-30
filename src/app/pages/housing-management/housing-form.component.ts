// housing-form.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-housing-form',
  templateUrl: './housing-form.component.html',
  styleUrls: ['./housing-form.component.scss'],
})
export class HousingFormComponent {
  form = {
    address: '',
    landlord: {
      fullName: '',
      phone: '',
      email: '',
    },
    facility: {
      beds: 0,
      mattresses: 0,
      tables: 0,
      chairs: 0,
    },
  };

  submitting = false;
  error: string | null = null;

  constructor(private housingService: HousingService, private router: Router) {}

  submit(): void {
    this.submitting = true;
    this.error = null;

    // Map landlord.fullName to landlord.name and facility to facilityInfo
    const formValue = this.form;
    const payload = {
      ...formValue,
      landlord: {
        name: formValue.landlord.fullName,
        phone: formValue.landlord.phone,
        email: formValue.landlord.email,
      },
      facilityInfo: formValue.facility,
    };

    this.housingService.createHouse(payload).subscribe({
      next: (house) => {
        this.submitting = false;
        this.router.navigate(['/housing', house.id || house._id]);
      },
      error: () => {
        this.submitting = false;
        this.error = 'Failed to create house.';
      },
    });
  }

  goToHousing(): void {
    this.router.navigate(['/housing']);
  }

  clearIfZero(field: 'beds' | 'mattresses' | 'tables' | 'chairs'): void {
    const value = this.form.facility[field];
    if (Number(value) === 0) {
      this.form.facility[field] = '' as any;
    }
  }
}
