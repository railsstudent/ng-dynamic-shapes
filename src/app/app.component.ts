import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    template: '<app-shell></app-shell>',
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
})
export class AppComponent {
    constructor(private title: Title) {
        this.title.setTitle('RxJS Random Shapes');
    }
}
