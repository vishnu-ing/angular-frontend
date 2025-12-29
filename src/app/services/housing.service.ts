// ...existing code...
// housing.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  HouseSummary,
  HouseDetails,
  FacilityReport,
  FacilityReportComment,
} from '../pages/housing-management/housing.models';

@Injectable({ providedIn: 'root' })
export class HousingService {
  updateReportStatus(reportId: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.reportsUrl}/${reportId}/status`, {
      status,
    });
  }
  private baseUrl = '/api/housing';
  private reportsUrl = '/api/facility-reports';

  constructor(private http: HttpClient) {}

  getHouses(): Observable<HouseSummary[]> {
    return this.http.get<HouseSummary[]>(this.baseUrl);
  }

  getHouseById(id: string): Observable<HouseDetails> {
    return this.http.get<HouseDetails>(`${this.baseUrl}/${id}`);
  }

  createHouse(payload: {
    address: string;
    landlord: { name: string; phone: string; email: string };
    facilityInfo: {
      beds: number;
      mattresses: number;
      tables: number;
      chairs: number;
    };
  }): Observable<HouseDetails> {
    return this.http.post<HouseDetails>(this.baseUrl, payload);
  }

  deleteHouse(id: string, reassign = true): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}?reassign=${reassign}`);
  }

  // Facility reports for a house with pagination
  getFacilityReports(
    houseId: string,
    page: number,
    pageSize: number
  ): Observable<{ reports: FacilityReport[]; total: number }> {
    return this.http.get<{ reports: FacilityReport[]; total: number }>(
      `${this.reportsUrl}`,
      { params: { houseId, page, pageSize } }
    );
  }

  addComment(
    reportId: string,
    description: string
  ): Observable<FacilityReportComment> {
    return this.http.post<FacilityReportComment>(
      `${this.reportsUrl}/${reportId}/comments`,
      { description }
    );
  }

  updateComment(
    reportId: string,
    commentId: string,
    description: string
  ): Observable<FacilityReportComment> {
    return this.http.put<FacilityReportComment>(
      `${this.reportsUrl}/${reportId}/comments/${commentId}`,
      { description }
    );
  }
}
