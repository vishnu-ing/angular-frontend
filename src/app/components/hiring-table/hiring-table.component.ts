import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hiring-table',
  templateUrl: './hiring-table.component.html',
  styleUrls: ['./hiring-table.component.scss']
})
export class HiringTableComponent {
  // receive data from parent
  @Input() users: any[] = []; 
  @Input() status: 'Pending' | 'Approved' | 'Rejected' = 'Pending';

  //tell parent when event happen
  @Output() view = new EventEmitter<string>();
  @Output() approve = new EventEmitter<any>();
  @Output() reject = new EventEmitter<any>();
  
  feedbackValues: { [username: string]: string } = {};
  
  // helper for table display
  get displayedColumns(): string[] {
    const baseColumns = ['fullName', 'email'];
    if (this.status === 'Pending') {
      return [...baseColumns, 'actions'];
    }
    //approve and rejected show the view button
    return [...baseColumns, 'viewOnly'];
  }

  onApprove(user: any) {
    const feedbackText = this.feedbackValues[user.userName] || '';
    
    // Create a new object combining the user and the feedback
    const payload = { 
      ...user, 
      feedback: feedbackText 
    };
    
    this.approve.emit(payload);
  }
  
  onReject(user: any) {
    const feedbackText = this.feedbackValues[user.userName] || '';
    
    const payload = { 
      ...user, 
      feedback: feedbackText 
    };
    
    this.reject.emit(payload);
  }
}
