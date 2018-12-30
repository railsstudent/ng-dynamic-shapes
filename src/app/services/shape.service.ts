import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum Shape {
    CIRCLE,
    TRIANGLE,
    SQUARE,
}

export interface IShape {
    shape: Shape;
    color: string;
}

export interface IShapeList {
    circles: IShape[];
    triangles: IShape[];
    squares: IShape[];
}

@Injectable({ providedIn: 'root' })
export class ShapeService {
    private circleSub$ = new Subject<IShape[]>();
    private triangleSub$ = new Subject<IShape[]>();
    private squareSub$ = new Subject<IShape[]>();

    circle$ = this.circleSub$.asObservable();
    triangle$ = this.triangleSub$.asObservable();
    square$ = this.squareSub$.asObservable();

    constructor() {}

    setShapeList({ circles, triangles, squares }: IShapeList) {
        this.circleSub$.next(circles);
        this.triangleSub$.next(triangles);
        this.squareSub$.next(squares);
    }
}
