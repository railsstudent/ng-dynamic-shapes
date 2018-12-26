import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-footer',
    template: `
        <ng-container *ngIf="(isSmallScreen$ | async); else web">
            <mat-card class="mat-elevation-z4">
                <mat-card-content class="container small">
                    <p>Made by Connie Leung @2018</p>
                    <p>Github: @railsstudent</p>
                    <p>Version: 0.0.1</p>
                    <p>Powered by Angular 7</p>
                </mat-card-content>
            </mat-card>
        </ng-container>

        <ng-template #web>
            <mat-card class="mat-elevation-z4">
                <mat-card-content class="container">
                    <div>
                        <p>Made by Connie Leung @2018</p>
                        <p>Github: @railsstudent</p>
                    </div>
                    <p>Version: 0.0.1</p>
                    <p>Powered by Angular 7</p>
                </mat-card-content>
            </mat-card>
        </ng-template>
    `,
    styles: [
        `
            :host {
                display: block;
            }

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
export class AppFooterComponent implements OnInit {
    isSmallScreen$: Observable<boolean>;

    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnInit() {
        this.isSmallScreen$ = this.breakpointObserver.observe(['(max-width: 599px)']).pipe(map(match => match.matches));
    }
}
