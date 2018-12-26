import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ShapeService } from '../services/shape.service';

@Component({
    selector: 'app-main',
    templateUrl: './app-main.component.html',
    styleUrls: ['./app-main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMainComponent implements OnInit {
    constructor(private shapeService: ShapeService) {}

    ngOnInit() {
        this.shapeService.shape$.subscribe();
    }
}
