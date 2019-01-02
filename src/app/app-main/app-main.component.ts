import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IShape, ShapeService } from '../services/shape.service';

@Component({
    selector: 'app-main',
    template: `
        <div class="container">
            <div class="title">Circle</div>
            <div class="list">
                <div class="item" *ngFor="let c of circleList">
                    <div class="{{ c.shape }}" [style.background]="c.color"></div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="title">Triangle</div>
            <div class="list">
                <div class="item" *ngFor="let c of triangleList">
                    <div class="{{ c.shape }}" [style.border-bottom-color]="c.color"></div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="title">Square</div>
            <div class="list">
                <div class="item" *ngFor="let c of squareList">
                    <div class="{{ c.shape }}" [style.background]="c.color"></div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            :host {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
            }

            .container {
                display: flex;
                flex-direction: column;
                padding: 0.5rem;
            }

            .container .title {
                text-decoration: underline;
                color: darkmagenta;
            }

            .list {
                display: grid;
                grid-template-columns: repeat(auto-fill, 5em);
                grid-auto-rows: 5em;
                grid-gap: 3px;
            }

            .list .item {
                width: 100%;
                height: 100%;
            }

            .circle {
                height: 100%;
                border-radius: 50%;
            }

            .square {
                height: 100%;
            }

            .triangle {
                width: 0;
                height: 0;
                border-left: 2.4em solid transparent;
                border-right: 2.4em solid transparent;
                border-bottom: 4.8em solid black;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMainComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();
    circleList: IShape[] = [];
    triangleList: IShape[] = [];
    squareList: IShape[] = [];

    constructor(private shapeService: ShapeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.shapeService.circle$.pipe(takeUntil(this.unsubscribe$)).subscribe(ll => {
            this.circleList = ll;
            this.cd.markForCheck();
        });

        this.shapeService.triangle$.pipe(takeUntil(this.unsubscribe$)).subscribe(ll => {
            this.triangleList = ll;
            this.cd.markForCheck();
        });

        this.shapeService.square$.pipe(takeUntil(this.unsubscribe$)).subscribe(ll => {
            this.squareList = ll;
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
        if (this.unsubscribe$) {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
        }
    }
}
