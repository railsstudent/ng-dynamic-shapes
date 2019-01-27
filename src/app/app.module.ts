import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppFooterLargeComponent } from './app-footer/app-footer-large.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AppComponent } from './app.component';
import { CustomMateriaModule } from './custom-material';

@NgModule({
    declarations: [
        AppComponent,
        AppShellComponent,
        AppFooterComponent,
        AppHeaderComponent,
        AppMainComponent,
        AppFooterLargeComponent,
    ],
    imports: [BrowserModule, BrowserAnimationsModule, CustomMateriaModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
