import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, fromEvent, merge, Subject } from 'rxjs';
import { map, mapTo, scan, shareReplay, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { IShape, RandomColorService, Shape, ShapeService } from '../services/';

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
                    <button id="resume" mat-raised-button color="accent">Resume</button>
                    <button id="pause" mat-raised-button color="warn">Pause</button>
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

    constructor(
        private cd: ChangeDetectorRef,
        private service: ShapeService,
        private randomColor: RandomColorService,
    ) {}

    ngOnInit() {}

    ngAfterViewInit() {
        const circleClick$ = fromEvent(document.getElementById('circle'), 'click').pipe(
            map(() =>
                this.randomColor.get_random_color({
                    luminosity: 'dark',
                    format: 'rgb',
                }),
            ),
            map(color => ({ shape: Shape.CIRCLE, color })),
            scan((acc: IShape[], shape: IShape) => acc.concat(shape), []),
            map(l => ({ circleList: l })),
            takeUntil(this.unsubscribe$),
        );

        const triangleClick$ = fromEvent(document.getElementById('triangle'), 'click').pipe(
            map(() =>
                this.randomColor.get_random_color({
                    luminosity: 'dark',
                    format: 'rgb',
                }),
            ),
            map(color => ({
                shape: Shape.TRIANGLE,
                color,
            })),
            scan((acc: IShape[], shape: IShape) => acc.concat(shape), []),
            map(l => ({ triangleList: l })),
            takeUntil(this.unsubscribe$),
        );

        const squareClick$ = fromEvent(document.getElementById('square'), 'click').pipe(
            map(() =>
                this.randomColor.get_random_color({
                    luminosity: 'dark',
                    format: 'rgb',
                }),
            ),
            map(color => ({
                shape: Shape.SQUARE,
                color,
            })),
            scan((acc: IShape[], shape: IShape) => acc.concat(shape), []),
            map(l => ({ squareList: l })),
            takeUntil(this.unsubscribe$),
        );

        const increment$ = merge(circleClick$, triangleClick$, squareClick$).pipe(
            scan(
                (acc, curr) => {
                    return { ...acc, ...curr };
                },
                {
                    circleList: [] as IShape[],
                    triangleList: [] as IShape[],
                    squareList: [] as IShape[],
                },
            ),
            shareReplay(1),
        );

        const resume$ = fromEvent(document.getElementById('resume'), 'click').pipe(mapTo(true));
        const pause$ = fromEvent(document.getElementById('pause'), 'click').pipe(mapTo(false));

        merge(resume$, pause$)
            .pipe(
                startWith(true),
                switchMap(action => (action ? increment$ : EMPTY)),
            )
            .subscribe(results => {
                const { circleList: circles, triangleList: triangles, squareList: squares } = results;
                this.shapeCounter = { circle: circles.length, square: squares.length, triangle: triangles.length };
                this.service.setShapeList({ circles, triangles, squares });
                this.cd.markForCheck();
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
