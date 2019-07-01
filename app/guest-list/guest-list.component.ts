import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'GuestList',
  template: `
    <input #newGuest
      (keyup.enter)="addGuest(newGuest.value)"
      (blur)="addGuest(newGuest.value); newGuest.value='' ">

    <button (click)="addGuest(newGuest.value)">Add</button>

    <ul><li *ngFor="let guests of guestlist">{{guest}}</li></ul>
  `
})
export class GuestList {
  guests = ['Guest1', 'Guest2', 'Guest3', 'Guest4'];
  addGuest(newGuest: string) {
    if (newGuest) {
      this.guests.push(newGuest);
    }
  }
}