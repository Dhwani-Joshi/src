var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { mobiscroll, MbscEventcalendar } from '@mobiscroll/angular';
var LittleTourComponent = /** @class */ (function () {
    function LittleTourComponent() {
        this.heroes = ['Guest1', 'Guest2', 'Guest3', 'Guest4'];
    }
    LittleTourComponent.prototype.addGuest = function (newGuest) {
        if (newGuest) {
            this.addGuest(newGuest);
        }
    };
    return LittleTourComponent;
}());
export { LittleTourComponent };
mobiscroll.settings = {
    theme: 'ios'
};
var preventSet = false;
var id = 5;
var now = new Date();
var btn = '<button class="mbsc-btn mbsc-btn-outline mbsc-btn-danger md-delete-btn">Delete</button>';
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        var _this = this;
        this.allDay = false;
        this.eventDate = [now, new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 2)];
        this.isFree = 'busy';
        this.eventText = '';
        this.eventDesc = '';
        this.events = [{
                id: 1,
                start: new Date(now.getFullYear(), now.getMonth(), 8, 13),
                end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
                text: 'Lunch @ Butcher\'s' + btn,
                color: '#26c57d'
            }, {
                id: 2,
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16),
                text: 'Guest List' + btn,
                color: '#fd966a'
            }, {
                id: 3,
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22),
                text: 'Dexter BD' + btn,
                color: '#37bbe4'
            }, {
                id: 4,
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 30),
                text: 'Guest List' + btn,
                color: '#d00f0f'
            }];
        this.rangeSettings = {
            controls: ['date', 'time'],
            dateWheels: '|D M d|',
            startInput: '#startDate',
            endInput: '#endDate',
            tabs: false,
            responsive: {
                large: {
                    touchUi: false
                }
            },
            showSelector: false
        };
        this.daySettings = {
            display: 'inline',
            view: {
                eventList: { type: 'day' }
            },
            onPageChange: function (event, inst) {
                var day = event.firstDay;
                preventSet = true;
                _this.navigate(_this.monthCal.instance, day);
                _this.eventDate = [day, new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 2)];
            },
            onEventSelect: function (event, inst) {
                if (event.domEvent.target.classList.contains('md-delete-btn')) {
                    mobiscroll.confirm({
                        title: 'Confirm Deletion',
                        message: 'Are you sure you want to delete this item?',
                        okText: 'Delete',
                        callback: function (res) {
                            if (res) {
                                //remove element by id
                                var events = _this.events;
                                var index = events.indexOf(events.filter(function (x) { return x.id === event.event.id; })[0]);
                                events.splice(index, 1);
                                mobiscroll.toast({
                                    message: 'Deleted'
                                });
                            }
                        }
                    });
                }
            }
        };
        this.monthSettings = {
            display: 'inline',
            view: {
                calendar: { type: 'month' }
            },
            onSetDate: function (event, inst) {
                if (!preventSet) {
                    var day = event.date;
                    _this.navigate(_this.dayCal.instance, day);
                    _this.eventDate = [day, new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 2)];
                }
                preventSet = false;
            }
        };
        this.popupSettings = {
            display: 'center',
            cssClass: 'mbsc-no-padding',
            buttons: [{
                    text: 'Add event',
                    handler: 'set'
                },
                'cancel'
            ],
            headerText: 'Add new event',
            onSet: function (event, inst) {
                _this.events.push({
                    id: id,
                    start: _this.eventDate[0],
                    end: _this.eventDate[1],
                    text: (_this.eventText || 'New Event') + btn,
                    title: _this.eventText || 'New Event',
                    description: _this.eventDesc,
                    allDay: _this.allDay,
                    free: _this.isFree === 'free'
                });
                _this.eventText = '';
                _this.eventDesc = '';
                id += 1;
                // Navigate the calendar to the new event's start date
                _this.monthCal.instance.navigate(_this.eventDate[0], true);
            }
        };
    }
    AppComponent.prototype.navigate = function (inst, val) {
        if (inst) {
            inst.navigate(val);
        }
    };
    AppComponent.prototype.change = function () {
        this.control = this.allDay ? ['date'] : ['date', 'time'];
        this.wheels = this.allDay ? 'MM dd yy' : '|D M d|';
    };
    __decorate([
        ViewChild('mbscMonthCal'),
        __metadata("design:type", typeof (_a = typeof MbscEventcalendar !== "undefined" && MbscEventcalendar) === "function" && _a || Object)
    ], AppComponent.prototype, "monthCal", void 0);
    __decorate([
        ViewChild('mbscDayCal'),
        __metadata("design:type", typeof (_b = typeof MbscEventcalendar !== "undefined" && MbscEventcalendar) === "function" && _b || Object)
    ], AppComponent.prototype, "dayCal", void 0);
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html'
        })
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map