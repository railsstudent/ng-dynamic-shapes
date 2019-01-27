import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFooter } from '.';

@Component({
    selector: 'app-footer',
    template: `
        <ng-container *ngIf="(isSmallScreen$ | async); else web">
            <app-footer-large [data]="data">
                <div>
                    <p>Author: {{ data.author }}</p>
                    <p>Written in {{ data.powerby }}</p>
                </div>
                <div class="right">
                    <p>Version: {{ data.version }}</p>
                    <p>Github: <a [href]="data.github" target="_blank">Code</a></p>
                </div>
            </app-footer-large>
        </ng-container>

        <ng-template #web>
            <app-footer-large [data]="data">
                <div>
                    <p>Author: {{ data.author }}</p>
                    <p>Written in {{ data.powerby }}</p>
                </div>
                <p>Version: {{ data.version }}</p>
                <p>Github: <a [href]="data.github" target="_blank">Code</a></p>
            </app-footer-large>
        </ng-template>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            .right {
                text-align: right;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent implements OnInit {
    isSmallScreen$: Observable<boolean>;

    data: IFooter = {
        author: `Connie Leung @${new Date().getFullYear()}`,
        github: 'https://github.com/railsstudent/ng-dynamic-shapes',
        version: '0.0.3',
        powerby: 'Angular',
    };

    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnInit() {
        this.isSmallScreen$ = this.breakpointObserver.observe(['(max-width: 599px)']).pipe(map(match => match.matches));
    }
}
