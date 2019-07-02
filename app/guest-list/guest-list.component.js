var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var GuestList = /** @class */ (function () {
    function GuestList() {
        this.guests = ['Guest1', 'Guest2', 'Guest3', 'Guest4'];
    }
    GuestList.prototype.addGuest = function (newGuest) {
        if (newGuest) {
            this.guests.push(newGuest);
        }
    };
    GuestList = __decorate([
        Component({
            selector: 'GuestList',
            template: "\n    <input #newGuest\n      (keyup.enter)=\"addGuest(newGuest.value)\"\n      (blur)=\"addGuest(newGuest.value); newGuest.value='' \">\n\n    <button (click)=\"addGuest(newGuest.value)\">Add</button>\n\n    <ul><li *ngFor=\"let guests of guestlist\">{{guest}}</li></ul>\n  "
        })
    ], GuestList);
    return GuestList;
}());
export { GuestList };
//# sourceMappingURL=guest-list.component.js.map