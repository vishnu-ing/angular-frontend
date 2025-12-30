import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services';

@Component({
  selector: 'app-show-in-progress-only',
  templateUrl: './show-in-progress-only.component.html',
  styleUrls: ['./show-in-progress-only.component.scss'],
})
export class ShowInProgressOnlyComponent implements OnInit {

  users: any[] = [];

  approved: Record<string, boolean> = {};
  rejected: Record<string, boolean> = {};
  feedback: Record<string, string> = {};

  actionMode: Record<string, 'NONE' | 'APPROVE' | 'REJECT'> = {};

  constructor(
    private visaSvc: EmployeesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.visaSvc.getInProgress().subscribe({
      next: (res) => {
        this.users = res;
        this.approved = {};
        this.rejected = {};
        this.feedback = {};
      },
      error: () => {
        this.snackBar.open('Failed to load visas', 'Close', { duration: 3000 });
      },
    });
  }

  open(url: string): void {
    window.open(url, '_blank');
  }

  selectApprove(visaId:string):void{
    this.actionMode[visaId] = 'APPROVE'
  }

  selectReject(visaId:string):void{
    this.actionMode[visaId] = 'REJECT'
  }
  sendEmailAndApprove(visaId: string): void {
    this.visaSvc.updateStatus(visaId, { status: 'Approved' }).subscribe({
      next: () => {
        this.visaSvc.notify(visaId).subscribe(() => {
          this.snackBar.open('Email sent', 'Close', { duration: 3000 });
          this.load();
        });
      },
      error: () =>
        this.snackBar.open('Approval failed', 'Close', { duration: 3000 }),
    });
  }
  submitFeedback(visaId: string): void {
    this.visaSvc.updateStatus(visaId, {
      status: 'Rejected',
      feedback: this.feedback[visaId],
    }).subscribe(() => this.load());
  }
  goToShowAll(): void {
    this.router.navigate(['/visa-management/approved']);
  }
}
