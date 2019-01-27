import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IFooter } from '.';

@Component({
    selector: 'app-footer-large',
    template: `
        <mat-card class="mat-elevation-z4">
            <mat-card-content class="container"> <ng-content></ng-content> </mat-card-content>
        </mat-card>
    `,
    styles: [
        `
            .container {
                display: flex;
                justify-content: space-between;
            }

            .mat-card-content {
                color: #ff4081;
                font-size: 1em;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterLargeComponent {
    @Input()
    data: IFooter;
}
