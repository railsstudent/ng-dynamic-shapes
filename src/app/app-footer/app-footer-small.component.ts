import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IFooter } from '.';

@Component({
    selector: 'app-footer-small',
    template: `
        <mat-card class="mat-elevation-z4">
            <mat-card-content class="container small">
                <p>{{ data.copyright }}</p>
                <p>Github: <a [href]="data.github" target="_blank">Code</a></p>
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

            .small {
                flex-direction: column;
                align-items: center;
                justify-content: start;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterSmallComponent implements OnInit {
    @Input()
    data: IFooter;

    constructor() {}

    ngOnInit() {}
}
