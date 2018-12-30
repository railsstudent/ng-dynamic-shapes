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
                <ng-container *ngFor="let c of circleList">
                    <div class="item">{{ c.shape }}, {{ c.color }}</div>
                </ng-container>
            </div>
        </div>
        <div class="container">
            <div class="title">Triangle</div>
            <div class="list">
                <ng-container *ngFor="let c of triangleList">
                    <div class="item">{{ c.shape }}, {{ c.color }}</div>
                </ng-container>
            </div>
        </div>
        <div class="container">
            <div class="title">Square</div>
            <div class="list">
                <ng-container *ngFor="let c of squareList">
                    <div class="item">{{ c.shape }}, {{ c.color }}</div>
                </ng-container>
            </div>
        </div>
    `,
    styleUrls: ['./app-main.component.scss'],
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
