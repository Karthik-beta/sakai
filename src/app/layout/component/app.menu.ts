import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                items: [
                    { label: 'Overview', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Employee Management',
                items: [
                    { label: 'Employee Onboarding', icon: 'pi pi-fw pi-user-plus', routerLink: ['/pages/employee-management/employee-onboarding'] }
                ]
            },
            {
                label: 'Attendance Management',
                items: [
                    { label: 'Daily Attendance', icon: 'pi pi-fw pi-clock', routerLink: ['/attendance/daily-info'] },
                    { label: 'Monthly Summary', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/attendance/monthly-info'] },
                    { label: 'Device Logs', icon: 'pi pi-fw pi-server', routerLink: ['/attendance/device-logs'] }
                ]
            },
            {
                label: 'Attendance Regularization',
                items: [
                    { label: 'Missed Punched Management', icon: 'pi pi-fw pi-exclamation-triangle', routerLink: ['/attendance/regularization/missed-punches'] },
                    { label: 'Holiday Management', icon: 'pi pi-fw pi-calendar', routerLink: ['/attendance/regularization/holidays'] },
                    { label: 'Recalculate Attendance', icon: 'pi pi-fw pi-refresh', routerLink: ['/attendance/regularization/recalculate'] }
                ]
            },
            {
                label: 'Reports & Analytics',
                items: [
                    {
                        label: 'Daily Reports', icon: 'pi pi-fw pi-chart-line',
                        items: [
                            { label: 'Mandays Report', icon: 'pi pi-fw pi-users', routerLink: ['/reports/daily/mandays'] },
                            { label: 'Present Employees', icon: 'pi pi-fw pi-user', routerLink: ['/reports/daily/present'] },
                            { label: 'Absent Employees', icon: 'pi pi-fw pi-user-minus', routerLink: ['/reports/daily/absent'] },
                            { label: 'Late Arrivals', icon: 'pi pi-fw pi-clock', routerLink: ['/reports/daily/late-entry'] },
                            { label: 'Early Departures', icon: 'pi pi-fw pi-sign-out', routerLink: ['/reports/daily/early-exit'] },
                            { label: 'Overtime', icon: 'pi pi-fw pi-stopwatch', routerLink: ['/reports/daily/overtime'] },
                            { label: 'Missed Punches', icon: 'pi pi-fw pi-ban', routerLink: ['/reports/daily/missed-punches'] },
                            { label: 'Insufficient Hours', icon: 'pi pi-fw pi-hourglass', routerLink: ['/reports/daily/insufficient-hours'] }
                        ]
                    },
                    {
                        label: 'Monthly Reports', icon: 'pi pi-fw pi-calendar',
                        items: [
                            { label: 'In - Out Summary', icon: 'pi pi-fw pi-calendar', routerLink: ['/reports/monthly/in-out'] },
                            { label: 'In - Out Register', icon: 'pi pi-fw pi-arrows-h', routerLink: ['/reports/monthly/in-out-register'] },
                            { label: 'Duty Hours Register', icon: 'pi pi-fw pi-clock', routerLink: ['/reports/monthly/duty-hours-register'] },
                            { label: 'Muster Roll Register', icon: 'pi pi-fw pi-users', routerLink: ['/reports/monthly/muster-roll-register'] },
                            { label: 'Payroll Output Register', icon: 'pi pi-fw pi-money-bill', routerLink: ['/reports/monthly/payroll-output-register'] },
                            { label: 'Shift Roaster Register', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/reports/monthly/shift-roaster-register'] },
                            { label: 'Overtime Register', icon: 'pi pi-fw pi-stopwatch', routerLink: ['/reports/monthly/overtime-register'] },
                            { label: 'Late Arrivals Register', icon: 'pi pi-fw pi-arrow-right', routerLink: ['/reports/monthly/late-entry-register'] },
                            { label: 'Early Departures Register', icon: 'pi pi-fw pi-arrow-left', routerLink: ['/reports/monthly/early-exit-register'] },
                            { label: 'Absent Employees Register', icon: 'pi pi-fw pi-user-minus', routerLink: ['/reports/monthly/absent-register'] },
                            { label: 'Present Employees Register', icon: 'pi pi-fw pi-user', routerLink: ['/reports/monthly/present-register'] }
                        ]
                    }
                ]
            },
            {
                label: 'System Configuration',
                items: [
                    { label: 'System Configuration', icon: 'pi pi-fw pi-cog', routerLink: ['/configuration'] },
                    { label: 'Device Configuration', icon: 'pi pi-fw pi-server', routerLink: ['/device_config'] }
                ]
            },
            {
                label: 'User Account',
                items: [
                    { label: 'My Profile', icon: 'pi pi-fw pi-user-edit' },
                    { label: 'Logout', icon: 'pi pi-fw pi-sign-out', styleClass: 'text-red-500 font-semibold hover:bg-red-50 hover:text-red-500 transition-colors', command: () => { this.authService.logout(); } }
                ]
            }
        ];
    }
}
