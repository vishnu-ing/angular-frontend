// housing-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HouseSummary } from './housing.models';

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
})
export class HousingListComponent implements OnInit {
  houses: HouseSummary[] = [];
  loading = false;
  error: string | null = null;

  constructor(private housingService: HousingService, private router: Router) {}

  ngOnInit(): void {
    console.log('DEBUG: HousingListComponent initialized');
    this.loadHouses();
  }

  loadHouses(): void {
    this.loading = true;
    this.error = null;

    this.housingService.getHouses().subscribe({
      next: (houses) => {
        this.houses = houses;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load houses.';
        this.loading = false;
      },
    });
  }

  goToDetails(house: HouseSummary): void {
    const id = house.id || house._id;
    console.log('Navigating to house details:', house);
    if (!id) {
      alert('House ID is missing!');
      return;
    }
    this.router.navigate(['/housing', id]);
  }

  addHouse(): void {
    this.router.navigate(['/housing/new']);
  }

  deleteHouse(house: HouseSummary): void {
    if (!confirm(`Delete house at ${house.address}?`)) return;

    this.housingService.deleteHouse(house.id, true).subscribe({
      next: () => {
        alert('House deleted and residents reassigned');
        this.loadHouses();
      },
      error: () => {
        alert('Failed to delete house');
      },
    });
  }
}
