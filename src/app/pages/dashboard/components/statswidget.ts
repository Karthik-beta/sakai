import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap, distinctUntilChanged, takeUntil, catchError } from 'rxjs/operators';
import { SharedService } from '../../../services/api-service/shared.service';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Present</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ presentCount }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-check text-blue-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ new_present_since_last_hour }} new</span>
                <span class="text-muted-color"> since last hour</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Absent</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ absentCount }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-calendar-times text-orange-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-orange-500 font-medium">%{{ percentage_change_absent_since_last_week }} </span>
                <span class="text-muted-color"> since last week</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Late Arrivals</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ lateEntryCount }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-arrow-down text-cyan-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">{{ frequent_late_arrivals }} </span>
                <span class="text-muted-color"> regular employees</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Early Departures</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ earlyExitCount }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-arrow-up text-purple-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-cyan-500 font-medium">{{ earlyExitCount }} </span>
                <span class="text-muted-color"> responded</span>
            </div>
        </div>`
})
export class StatsWidget implements OnInit {
    presentCount: number = 0;
    absentCount: number = 0;
    lateEntryCount: number = 0;
    earlyExitCount: number = 0;
    present_count_last_hour: number = 0;
    absent_percentage_increase: number = 0;
    frequent_late_arrivals: number = 0;
    new_present_since_last_hour: number = 0;
    percentage_change_absent_since_last_week: string = '';

    private destroyRef = inject(DestroyRef); // Inject Angular's DestroyRef
    private onDestroy$ = new Observable<void>((observer) => {
        this.destroyRef.onDestroy(() => {
            observer.next(); // Emit a value when the component is destroyed
            observer.complete(); // Complete the observable
        });
    });

    constructor(private service: SharedService) {}

    ngOnInit() {
        this.getAttendanceMetrics();
    }

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
                this.presentCount = data.today.total_present;
                this.new_present_since_last_hour = data.today.new_present_since_last_hour;
                this.absentCount = data.today.total_absent;
                this.percentage_change_absent_since_last_week = data.today.percentage_change_absent_since_last_week;
                this.lateEntryCount = data.today.total_late_entries;
                this.earlyExitCount = data.today.total_early_exits;
                this.present_count_last_hour = data.present_count_last_hour;
                this.absent_percentage_increase = data.absent_percentage_increase;
                this.frequent_late_arrivals = data.frequent_late_arrivals;
            });
    }
}
