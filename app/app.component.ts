import { Component, ViewChild } from '@angular/core';
import { mobiscroll, MbscEventcalendarOptions, MbscRangeOptions, MbscFormOptions, MbscEventcalendar, MbscPopupOptions } from '@mobiscroll/angular';

mobiscroll.settings = {
    theme: 'ios'
};

let preventSet = false;
let id = 5;

const now = new Date();
const btn = '<button class="mbsc-btn mbsc-btn-outline mbsc-btn-danger md-delete-btn">Delete</button>';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    @ViewChild('mbscMonthCal')
    monthCal: MbscEventcalendar;

    @ViewChild('mbscDayCal')
    dayCal: MbscEventcalendar;

    allDay = false;
    eventDate = [now, new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 2)];
    isFree = 'busy';
    eventText = '';
    eventDesc = '';
    control: Array < string > ;
    wheels: string;
    events: any = [{
        id: 1,
        start: new Date(now.getFullYear(), now.getMonth(), 8, 13),
        end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
        text: 'Lunch @ Butcher\'s' + btn,
        color: '#26c57d'
    }, {
        id: 2,
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16),
        text: 'General orientation' + btn,
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
        text: 'Stakeholder mtg.' + btn,
        color: '#d00f0f'
    }];

    rangeSettings: MbscRangeOptions = {
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

    daySettings: MbscEventcalendarOptions = {
        display: 'inline',
        view: {
            eventList: { type: 'day' }
        },
        onPageChange: (event, inst) => {
            const day = event.firstDay;
            preventSet = true;
            this.navigate(this.monthCal.instance, day);
            this.eventDate = [day, new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 2)];
        },
        onEventSelect: (event, inst) => {
            if (event.domEvent.target.classList.contains('md-delete-btn')) {
                mobiscroll.confirm({
                    title: 'Confirm Deletion',
                    message: 'Are you sure you want to delete this item?',
                    okText: 'Delete',
                    callback: (res) => {
                        if (res) {
                            //remove element by id
                            const events = this.events;
                            const index = events.indexOf(events.filter(x => x.id === event.event.id)[0]);

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

    monthSettings: MbscEventcalendarOptions = {
        display: 'inline',
        view: {
            calendar: { type: 'month' }
        },
        onSetDate: (event, inst) => {
            if (!preventSet) {
                const day = event.date;
                this.navigate(this.dayCal.instance, day);
                this.eventDate = [day, new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 2)];
            }
            preventSet = false;
        }
    };

    popupSettings: MbscPopupOptions = {
        display: 'center',
        cssClass: 'mbsc-no-padding',
        buttons: [{
                text: 'Add event',
                handler: 'set'
            },
            'cancel'
        ],
        headerText: 'Add new event',
        onSet: (event, inst) => {
            this.events.push({
                id: id,
                start: this.eventDate[0],
                end: this.eventDate[1],
                text: (this.eventText || 'New Event') + btn,
                title: this.eventText || 'New Event',
                description: this.eventDesc,
                allDay: this.allDay,
                free: this.isFree === 'free'
            });
            this.eventText = '';
            this.eventDesc = '';
            id += 1;
            // Navigate the calendar to the new event's start date
            this.monthCal.instance.navigate(this.eventDate[0], true);
        }
    };

    navigate(inst, val) {
        if (inst) {
            inst.navigate(val);
        }
    }

    change() {
        this.control = this.allDay ? ['date'] : ['date', 'time'];
        this.wheels = this.allDay ? 'MM dd yy' : '|D M d|';
    }
}
