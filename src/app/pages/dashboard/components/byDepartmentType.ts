import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap, distinctUntilChanged, takeUntil, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { SharedService } from '../../../services/api-service/shared.service';

@Component({
    standalone: true,
    selector: 'app-by-department-type',
    imports: [CommonModule, ButtonModule, MenuModule, ChartModule],
    template: ` <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">Attendance by Department</div>
            <div>
                <button pButton type="button" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-button-plain" (click)="menu.toggle($event)"></button>
                <p-menu #menu [popup]="true" [model]="items"></p-menu>
            </div>
        </div>
        <ul class="list-none p-0 m-0">
            <li *ngFor="let item of byDepartmentType" class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">{{ item.department_name | titlecase }}</span>
                    <div class="mt-1 text-muted-color">{{ item.company_name | titlecase }}</div>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">

                        <div class="h-full" [ngClass]="'bg-' + item.color" [ngStyle]="{ 'width': item.percentage + '%' }"></div>
                    </div>
                    <span class="text-{{ item.color }} ml-4 font-medium">%{{ item.percentage | number: '2.2-2' }}</span>
                </div>
            </li>
        </ul>
    </div>`
})
export class ByDepartmentType implements OnInit {
    menu = null;
    byDepartmentType: any = [];
    chartData: any;
    chartOptions: any;

    items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
    ];

    constructor(private service:SharedService) {}

    ngOnInit() {
        this.getAttendanceMetrics();
        this.initChart();
    }

    private destroyRef = inject(DestroyRef); // Inject Angular's DestroyRef
    private onDestroy$ = new Observable<void>((observer) => {
        this.destroyRef.onDestroy(() => {
            observer.next(); // Emit a value when the component is destroyed
            observer.complete(); // Complete the observable
        });
    });

    getAttendanceMetrics() {
        interval(30000)
            .pipe(
                startWith(0), // Emit immediately
                switchMap(() => this.service.getAttendanceStats()), // Fetch data
                distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)), // Avoid duplicate emissions
                takeUntil(this.onDestroy$), // Automatically unsubscribe on component destroy
                catchError((error) => {
                    console.error('Error fetching attendance metrics:', error);
                    return []; // Return an empty observable to prevent breaking the stream
                })
            )
            .subscribe((data: any) => {
                const colors = ['red-500', 'cyan-500', 'orange-500', 'pink-500', 'green-500', 'blue-500', 'purple-500', 'lime-500', 'rose-500', 'teal-500', 'violet-500', 'fuchsia-500', 'yellow-500'];
                this.byDepartmentType = data.department_data.map((item: any, index: number) => ({
                    ...item,
                    color: colors[index % colors.length] // Cycle through the colors array
                }));
            });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Present',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-700'),
                    borderColor: documentStyle.getPropertyValue('--green-700'),
                    tension: .4
                },
                {
                    label: 'Absent',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--red-600'),
                    borderColor: documentStyle.getPropertyValue('--red-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
