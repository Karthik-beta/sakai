import { Component, OnInit } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { Product, ProductService } from '../../service/product.service';

@Component({
    standalone: true,
    selector: 'app-strength-overview',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule, ChartModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl">Strength Overview</div>
            <p-chart type="line" [data]="chartData" [options]="chartOptions"></p-chart>
        </div>`,
    providers: [ProductService]
})
export class StrengthOverview implements OnInit {
    products!: Product[];
    chartData: any;
    chartOptions: any;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.initChart();
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
