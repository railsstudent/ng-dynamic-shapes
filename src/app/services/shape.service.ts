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
    private shapeSub$ = new Subject<Shape>();
    shape$ = this.shapeSub$.asObservable();

    constructor() {}

    appendShape(shape: Shape) {
        this.shapeSub$.next(shape);
    }
}
