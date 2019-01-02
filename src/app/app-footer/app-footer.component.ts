import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFooter } from '.';

@Component({
    selector: 'app-footer',
    template: `
        <ng-container *ngIf="(isSmallScreen$ | async); else web">
            <app-footer-small [data]="data"></app-footer-small>
        </ng-container>

        <ng-template #web> <app-footer-large [data]="data"></app-footer-large> </ng-template>
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

    data: IFooter = {
        copyright: 'Made by Connie Leung @2019',
        github: 'https://github.com/railsstudent/ng-dynamic-shapes',
        version: '0.0.2',
        powerby: 'Angular 7',
    };

    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnInit() {
        this.isSmallScreen$ = this.breakpointObserver.observe(['(max-width: 599px)']).pipe(map(match => match.matches));
    }
}
