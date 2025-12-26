import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as HiringActions from '../../store/actions/hiring.action';
import {selectAllEmployees,selectApprovedUsers,selectHiringState,selectPendingUsers,selectRejectedUsers} from '../../store/selectors/hiring.selectors'; 

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.scss']
})
export class HiringManagementComponent implements OnInit {
  pendingUsers$ = this.store.select(selectPendingUsers);
  approvedUsers$ = this.store.select(selectApprovedUsers);
  rejectedUsers$ = this.store.select(selectRejectedUsers);
  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(HiringActions.loadEmployees());
  }

  openApplication(username: string) {
    if (!username) return;
    const token = localStorage.getItem('token');
    const url = `http://localhost:5173/onboarding?username=${username}&view=hr&token=${token}`;
    window.open(url, '_blank');
  }

  onApprove(user: any): void {
    this.store.dispatch(HiringActions.updateEmployeeStatus({
      userId: user._id, 
      status: 'Approved',
      feedback: user.feedback || '' //send the feedback from the text box
    }));
  }

  onReject(user: any): void {
    this.store.dispatch(HiringActions.updateEmployeeStatus({
      userId: user._id,
      status: 'Rejected',
      feedback: user.feedback || ''
    }));
  }
}