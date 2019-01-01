import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IFooter } from '.';

@Component({
    selector: 'app-footer-large',
    template: `
        <mat-card class="mat-elevation-z4">
            <mat-card-content class="container">
                <div>
                    <p>{{ data.copyright }}</p>
                    <p>Github: {{ data.github }}</p>
                </div>
                <p>Version: {{ data.version }}</p>
                <p>Powered by {{ data.powerby }}</p>
            </mat-card-content>
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
export class AppFooterLargeComponent implements OnInit {
    @Input()
    data: IFooter;

    constructor() {}

    ngOnInit() {}
}
