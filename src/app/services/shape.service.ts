import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum Shape {
    CIRCLE = 'circle',
    TRIANGLE = 'triangle',
    SQUARE = 'square',
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
    private speechSub$ = new Subject<string>();

    circle$ = this.circleSub$.asObservable();
    triangle$ = this.triangleSub$.asObservable();
    square$ = this.squareSub$.asObservable();
    speech$ = this.speechSub$.asObservable();
    speechEnabled = false;

    setShapeList({ circles, triangles, squares }: IShapeList) {
        this.circleSub$.next(circles);
        this.triangleSub$.next(triangles);
        this.squareSub$.next(squares);
        this.speechSub$.next(`${circles.length} circles, ${triangles.length} triangles and ${squares.length} squares.`);
    }

    enableSpeech(enabled: boolean) {
        this.speechEnabled = enabled;
    }
}
