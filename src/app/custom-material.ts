import { NgModule } from '@angular/core';
import { MatBadgeModule, MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';

@NgModule({
    exports: [MatBadgeModule, MatButtonModule, MatCardModule, MatIconModule],
})
export class CustomMateriaModule {}
