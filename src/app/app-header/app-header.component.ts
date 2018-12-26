import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { map, mapTo, scan, startWith, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    template: `
        <mat-card class="mat-elevation-z4">
            <mat-card-content>
                <mat-card-actions>
                    <button
                        id="circle"
                        mat-raised-button
                        color="primary"
                        matBadge="{{ shapeCounter.circle }}"
                        matBadgeColor="accent"
                    >
                        Add Circle<mat-icon>add</mat-icon>
                    </button>
                    <button
                        id="triangle"
                        mat-raised-button
                        color="accent"
                        matBadge="{{ shapeCounter.triangle }}"
                        matBadgeColor="primary"
                    >
                        Add Triangle<mat-icon>add</mat-icon>
                    </button>
                    <button
                        id="square"
                        mat-raised-button
                        color="primary"
                        matBadge="{{ shapeCounter.square }}"
                        matBadgeColor="accent"
                    >
                        Add Square<mat-icon>add</mat-icon>
                    </button>
                </mat-card-actions>
            </mat-card-content>
        </mat-card>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            mat-card-actions {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            }

            mat-card-actions > button {
                margin-left: 0;
                margin-right: 1rem !important;
                margin-bottom: 0.5rem !important;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
    unsubscribe$ = new Subject();

    shapeCounter = {
        circle: 0,
        triangle: 0,
        square: 0,
    };

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {}

    ngAfterViewInit() {
        const circleClick$ = fromEvent(document.getElementById('circle'), 'click').pipe(
            mapTo(1),
            scan((acc, one) => acc + one, 0),
            map(c => ({
                circle: c,
            })),
            takeUntil(this.unsubscribe$),
        );

        const triangleClick$ = fromEvent(document.getElementById('triangle'), 'click').pipe(
            mapTo(1),
            scan((acc, one) => acc + one, 0),
            map(c => ({
                triangle: c,
            })),
            takeUntil(this.unsubscribe$),
        );

        const squareClick$ = fromEvent(document.getElementById('square'), 'click').pipe(
            mapTo(1),
            scan((acc, one) => acc + one, 0),
            map(c => ({ square: c })),
            takeUntil(this.unsubscribe$),
        );

        merge(circleClick$, triangleClick$, squareClick$)
            .pipe(
                startWith({ circle: 0, triangle: 0, square: 0 }),
                scan(
                    (acc, curr) => {
                        return { ...acc, ...curr };
                    },
                    { circle: 0, triangle: 0, square: 0 },
                ),
            )
            .subscribe(r => {
                this.shapeCounter = r;
                this.cd.markForCheck();
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
