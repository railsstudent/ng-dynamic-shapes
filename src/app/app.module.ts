import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AppComponent } from './app.component';
import { CustomMateriaModule } from './custom-material';
import { AppHeaderComponent } from './app-header/app-header.component';

@NgModule({
    declarations: [AppComponent, AppShellComponent, AppFooterComponent, AppHeaderComponent],
    imports: [BrowserModule, BrowserAnimationsModule, CustomMateriaModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
