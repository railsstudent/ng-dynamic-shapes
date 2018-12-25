import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-shell',
    template: `
        <div class="container">
            <app-header></app-header>
            <div>main content</div>
            <app-footer></app-footer>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            div.container {
                min-height: 100vh;
                height: auto;
                display: grid;
                grid-template-rows: auto 1fr auto;
                border: 10px solid red;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
