import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, fromEvent, merge, Subject } from 'rxjs';
import { map, mapTo, scan, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IShape, Shape, ShapeService } from '../services/shape.service';

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

    constructor(private cd: ChangeDetectorRef, private service: ShapeService) {}

    ngOnInit() {}

    ngAfterViewInit() {
        const circleClick$ = fromEvent(document.getElementById('circle'), 'click').pipe(
            map(() => '#ff0000'),
            map(color => ({ shape: Shape.CIRCLE, color })),
            map((shape: IShape) => ({ list: [shape] })),
            scan(
                (acc, shape) => {
                    const { list } = shape;
                    return {
                        count: acc.count + 1,
                        list: [...acc.list, ...list],
                    };
                },
                { count: 0, list: [] },
            ),
            map(result => ({
                circle: result.count,
                circleList: result.list,
            })),
            tap(r => console.log('circleTally$', r)),
            takeUntil(this.unsubscribe$),
        );

        const triangleClick$ = fromEvent(document.getElementById('triangle'), 'click').pipe(
            map(() => '#00ff00'),
            map(color => ({
                shape: Shape.TRIANGLE,
                color,
            })),
            map((shape: IShape) => ({ count: 1, list: [shape] })),
            scan(
                (acc, shape) => {
                    const { count, list } = shape;
                    return {
                        count: acc.count + count,
                        list: [...acc.list, ...list],
                    };
                },
                { count: 0, list: [] },
            ),
            map(result => ({ triangle: result.count, triangleList: result.list })),
            takeUntil(this.unsubscribe$),
        );

        const squareClick$ = fromEvent(document.getElementById('square'), 'click').pipe(
            map(() => '#0000ff'),
            map(color => ({
                shape: Shape.SQUARE,
                color,
            })),
            map((shape: IShape) => ({ count: 1, list: [shape] })),
            scan(
                (acc, shape) => {
                    const { count, list } = shape;
                    return {
                        count: acc.count + count,
                        list: [...acc.list, ...list],
                    };
                },
                { count: 0, list: [] },
            ),
            map(result => ({
                square: result.count,
                squareList: result.list,
            })),
            takeUntil(this.unsubscribe$),
        );

        const increment$ = merge(circleClick$, triangleClick$, squareClick$).pipe(
            scan(
                (acc, curr) => {
                    return { ...acc, ...curr };
                },
                {
                    circle: 0,
                    circleList: [] as IShape[],
                    triangle: 0,
                    triangleList: [] as IShape[],
                    square: 0,
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
                tap(r => console.log('counter', r)),
            )
            .subscribe(results => {
                const {
                    circle,
                    square,
                    triangle,
                    circleList: circles,
                    triangleList: triangles,
                    squareList: squares,
                } = results;
                this.shapeCounter = { circle, square, triangle };
                this.service.setShapeList({ circles, triangles, squares });
                this.cd.markForCheck();
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
