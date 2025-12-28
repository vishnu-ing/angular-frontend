import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as HiringActions from '../../store/actions/hiring.action';
import { selectRegistrationTokens } from '../../store/selectors/hiring.selectors';

@Component({
  selector: 'app-registration-management',
  templateUrl: './registration-management.component.html',
  styleUrls: ['./registration-management.component.scss']
})

export class RegistrationManagementComponent implements OnInit{
  newEmail: string = '';
  newName: string = '';
  tokenHistory$ = this.store.select(selectRegistrationTokens);
  displayedColumns: string[] = ['email', 'name', 'link', 'status'];

  constructor(private store: Store) {}

  ngOnInit(): void {
    //load history
    this.store.dispatch(HiringActions.loadRegistrationHistory());
  }

  onSendInvite(): void {
    if (!this.newEmail || !this.newName) {
      alert("Please fill in both email and name");
      return;
    }

    this.store.dispatch(HiringActions.generateToken({
      email: this.newEmail,
      name: this.newName
    }));

    // Reset Form
    this.newEmail = '';
    this.newName = '';
  }

}
