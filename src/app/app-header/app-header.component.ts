import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <mat-card class="mat-elevation-z4">
            <mat-card-content>
                <button mat-raised-button color="primary">Add Circle<mat-icon>add</mat-icon></button>
                <button mat-raised-button color="accent">Add Triangle<mat-icon>add</mat-icon></button>
                <button mat-raised-button color="primary">Add Square<mat-icon>add</mat-icon></button>
            </mat-card-content>
        </mat-card>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            mat-card-content {
                display: flex;
            }

            mat-card-content button {
                margin-right: 1rem;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
