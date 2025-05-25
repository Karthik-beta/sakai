import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap, distinctUntilChanged, takeUntil, catchError } from 'rxjs/operators';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../services/api-service/shared.service';

@Component({
    standalone: true,
    selector: 'app-by-employee-type',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Attendance by Employee Type</div>
        <p-table [value]="categoryWiseData" [paginator]="true" [rows]="5" responsiveLayout="scroll">
            <ng-template #header>
                <tr>
                    <th pSortableColumn="name">Employee Type <p-sortIcon field="name"></p-sortIcon></th>
                    <th pSortableColumn="present">Present <p-sortIcon field="present"></p-sortIcon></th>
                    <th pSortableColumn="absent">Absent <p-sortIcon field="absent"></p-sortIcon></th>
                    <th>View</th>
                </tr>
            </ng-template>
            <ng-template #body let-item>
                <tr>
                    <td style="width: 35%; min-width: 7rem;"><span [class]="'employee-badge status-' + item.category_name">{{item.category_name | titlecase }}</span></td>
                    <td style="width: 35%; min-width: 7rem;">{{ item.present }}</td>
                    <td style="width: 35%; min-width: 8rem;">{{ item.absent }}</td>
                    <td style="width: 15%;">
                        <button pButton pRipple type="button" icon="pi pi-search" class="p-button p-component p-button-text p-button-icon-only"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>`,
    styles: [
        `.employee-badge {
            border-radius: var(--border-radius);
            padding: .25em .5rem;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 12px;
            letter-spacing: .3px;
        }

        .employee-badge {
            &.status-Permanent {
                background: #C8E6C9;
                color: #256029;
            }

            &.status-Temporary {
                background: #FFCDD2;
                color: #C63737;
            }

            &.status-Probation {
                background: #FEEDAF;
                color: #8A5340;
            }

            &.status-Contractor {
                background: #B3E5FC;
                color: #0D47A1;
            }
        }`
    ]
})
export class ByEmployeeType implements OnInit {
    categoryWiseData: any = [];

    constructor(private service:SharedService) {}

    ngOnInit() {
        this.getAttendanceMetrics();
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
                this.categoryWiseData = data.category_data;
            });
    }
}
