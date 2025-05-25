import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        <span class="tracking-wide font-sans font-bold">PivotHR</span> by
        <a href="https://pivotr.in" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Pivotr</a>
    </div>`
})
export class AppFooter {}
