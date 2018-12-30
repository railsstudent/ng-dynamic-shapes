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

@Injectable({ providedIn: 'root' })
export class ShapeService {
    private circleSub$ = new Subject<IShape[]>();
    circle$ = this.circleSub$.asObservable();

    constructor() {}

    setCircleList(circles: IShape[]) {
        this.circleSub$.next(circles);
    }
}
