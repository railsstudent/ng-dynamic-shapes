import { NgModule } from '@angular/core';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
} from '@angular/material';

@NgModule({
    exports: [MatBadgeModule, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatSlideToggleModule],
})
export class CustomMateriaModule {}
