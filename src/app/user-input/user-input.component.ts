import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  username: string = '';

  @Output() searchUser: EventEmitter<string> = new EventEmitter();

  search() {
    this.searchUser.emit(this.username);
  }
}