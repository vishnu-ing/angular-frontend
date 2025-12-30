// housing-details.component.ts
// housing-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import {
  HouseDetails,
  FacilityReport,
  FacilityReportComment,
} from './housing.models';

@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
})
export class HousingDetailsComponent implements OnInit {
  editingStatus: { [reportId: string]: boolean } = {};
  currentUserIsHR: boolean = false;
  showDeleteModal = false;
  goToEmployee(empId: string): void {
    this.router.navigate(['/employee', empId]);
  }
  getCommentIds(report: FacilityReport): string[] {
    return (report.comments || []).map((c) => c.id);
  }
  trackByCommentId(index: number, comment: FacilityReportComment) {
    return comment.id;
  }
  // Safely check if current user is the author of the comment
  // Only allow edit if comment was made by HR
  isCommentHRAuthor(comment: FacilityReportComment): boolean {
    const createdBy: any = comment.createdBy;
    if (!createdBy) return false;
    if (typeof createdBy === 'object' && createdBy !== null) {
      return createdBy.role && createdBy.role.toLowerCase() === 'hr';
    }
    return false;
  }
  // Assume you have a way to get the current user's id (string)
  currentUserId: string = localStorage.getItem('userId') || '';
  editingComment: { [commentId: string]: boolean } = {};
  editCommentText: { [commentId: string]: string } = {};

  // Call this when user clicks Edit
  startEditComment(comment: FacilityReportComment) {
    this.editingComment[comment.id] = true;
    this.editCommentText[comment.id] = comment.description;
  }

  // Call this when user clicks Cancel
  cancelEditComment(comment: FacilityReportComment) {
    this.editingComment[comment.id] = false;
    this.editCommentText[comment.id] = '';
  }

  // Call this when user clicks Save
  saveEditComment(report: FacilityReport, comment: FacilityReportComment) {
    const newText = this.editCommentText[comment.id]?.trim();
    if (!newText || newText === comment.description) {
      this.cancelEditComment(comment);
      return;
    }
    // You need to implement this in your housingService
    this.housingService
      .updateComment(report.id, comment.id, newText)
      .subscribe({
        next: (_updated: FacilityReportComment) => {
          // After updating, reload the facility reports to get fresh data
          const houseId = (this.house as any)?._id || this.house?.id;
          if (houseId) {
            this.loadReports(houseId, this.reportsPage);
          }
          this.cancelEditComment(comment);
        },
        error: () => {
          alert('Failed to update comment.');
        },
      });
  }
  // Safely get display name for createdBy (string or object)
  getCreatedByDisplay(createdBy: any): string {
    if (!createdBy) return '';
    if (typeof createdBy === 'string') {
      // If it's a likely MongoDB ObjectId, show 'Unknown User'
      if (/^[a-f\d]{24}$/i.test(createdBy)) {
        return 'Unknown User';
      }
      return createdBy;
    }
    // If user has HR role
    if (createdBy.role && createdBy.role.toLowerCase() === 'hr') {
      return 'HR';
    }
    // Prefer firstName + lastName if present
    if (createdBy.firstName || createdBy.lastName) {
      return `${createdBy.firstName || ''} ${createdBy.lastName || ''}`.trim();
    }
    return (
      createdBy.name ||
      createdBy.fullName ||
      createdBy.username ||
      createdBy.email ||
      createdBy.id ||
      JSON.stringify(createdBy)
    );
  }
  house: HouseDetails | null = null;
  loadingHouse = false;
  error: string | null = null;

  reports: FacilityReport[] = [];
  reportsLoading = false;
  reportsPage = 1;
  reportsPageSize = 3; // Show 3 reports per page
  reportsTotal = 0;

  newComment: { [reportId: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router, // Make router public for template access
    private housingService: HousingService
  ) {}

  ngOnInit(): void {
    // Determine if current user is HR
    const userRole = localStorage.getItem('userRole');
    this.currentUserIsHR = !!userRole && userRole.trim().toLowerCase() === 'hr';

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/housing']);
      return;
    }
    this.loadHouse(id);
    // Do not call loadReports here, call after house is loaded and _id is known
  }

  startEditStatus(report: FacilityReport): void {
    this.editingStatus[report.id] = true;
  }

  cancelEditStatus(report: FacilityReport): void {
    this.editingStatus[report.id] = false;
  }

  changeReportStatus(report: FacilityReport): void {
    this.housingService.updateReportStatus(report.id, report.status).subscribe({
      next: (updatedReport) => {
        // Update the report's status and updatedAt timestamp in the UI
        report.status = updatedReport.status;
        if (updatedReport.updatedAt) {
          report.updatedAt = updatedReport.updatedAt;
        }
        this.editingStatus[report.id] = false;
      },
      error: () => {
        alert('Failed to update report status.');
      },
    });
  }

  loadHouse(id: string): void {
    this.loadingHouse = true;
    this.error = null;

    this.housingService.getHouseById(id).subscribe({
      next: (house) => {
        // Debug: log raw residents from backend
        console.log('Raw residents from backend:', (house as any).residents);
        // Map backend residents to employees for template compatibility
        console.log('Raw residents from backend:', (house as any).residents);
        const employees = Array.isArray((house as any).residents)
          ? (house as any).residents.map((emp: any, idx: number) => ({
              id: emp.id || emp.userName || idx.toString(),
              firstName: emp.firstName || '',
              lastName: emp.lastName || '',
              phone: emp.cellPhone || emp.phone || '',
              email: emp.email || '',
              car: emp.car,
              carInfo: emp.carInfo || '',
              userName: emp.userName || '',
            }))
          : [];
        console.log('Mapped employees:', employees);
        // Map facilityInfo to facility for template compatibility
        const facility =
          (house as any).facilityInfo || (house as any).facility || null;
        this.house = { ...house, employees, facility };
        // Always fetch facility reports via API using _id if available
        const houseId = (house as any)._id || house.id;
        this.loadReports(houseId, this.reportsPage);
        this.loadingHouse = false;
      },
      error: () => {
        this.error = 'Failed to load house details.';
        this.loadingHouse = false;
      },
    });
  }

  loadReports(houseId: string, page: number): void {
    this.reportsLoading = true;
    console.log(
      'Requesting facility reports for houseId:',
      houseId,
      'page:',
      page
    );
    this.housingService
      .getFacilityReports(houseId, page, this.reportsPageSize)
      .subscribe({
        next: (res) => {
          // Sort by updatedAt (if present) or createdAt, newest first
          let sorted = Array.isArray(res)
            ? [...res].sort((a, b) => {
                const dateA = new Date(a.updatedAt || a.createdAt).getTime();
                const dateB = new Date(b.updatedAt || b.createdAt).getTime();
                return dateB - dateA;
              })
            : [];
          // Map reports for current page
          this.reportsTotal = sorted.length;
          const startIdx = (this.reportsPage - 1) * this.reportsPageSize;
          const endIdx = startIdx + this.reportsPageSize;
          this.reports = sorted
            .slice(startIdx, endIdx)
            .map((r: any, reportIdx: number) => ({
              id: r.id || r._id || '',
              title: r.title,
              description: r.description,
              createdBy: r.createdBy,
              reportedBy: r.reportedBy, // Map reportedBy from backend
              status: r.status,
              createdAt: r.createdAt,
              updatedAt: r.updatedAt, // <-- Map updatedAt from backend
              comments: Array.isArray(r.comments)
                ? r.comments.map((c: any, commentIdx: number) => ({
                    id: c.id || c._id || `${reportIdx}_${commentIdx}`,
                    description: c.description,
                    createdBy: c.createdBy,
                    createdAt: c.timestamp || c.createdAt || null,
                    ...c,
                  }))
                : [],
            }));
          this.reportsLoading = false;
        },
        error: (err) => {
          console.error('Facility reports API error:', err);
          this.reports = [];
          this.reportsLoading = false;
        },
      });
  }

  onPageChange(page: number): void {
    if (!this.house) return;
    this.reportsPage = page;
    const houseId = (this.house as any)._id || this.house.id;
    this.loadReports(houseId, page);
  }

  addComment(report: FacilityReport): void {
    const text = this.newComment[report.id]?.trim();
    if (!text) return;

    this.housingService.addComment(report.id, text).subscribe({
      next: (comment: FacilityReportComment) => {
        report.comments = [...report.comments, comment];
        this.newComment[report.id] = '';
      },
    });
  }

  deleteHouse(): void {
    if (!this.house) return;
    const houseId = this.house.id ?? this.house._id;
    if (!houseId) {
      this.error = 'No valid house ID found.';
      return;
    }
    this.housingService.deleteHouse(houseId).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.router.navigate(['/housing']);
      },
      error: () => {
        this.showDeleteModal = false;
        this.error = 'Failed to delete house.';
      },
    });
  }
}
