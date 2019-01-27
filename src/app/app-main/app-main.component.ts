import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ShapeService } from '../services/shape.service';

@Component({
    selector: 'app-main',
    template: `
        <ng-container *ngIf="(className$ | async) as className">
            <div class="{{ className }}">
                <div class="container">
                    <div class="title">Circle</div>
                    <div class="list">
                        <div class="item" *ngFor="let c of (shapeService.circle$ | async)">
                            <div class="{{ c.shape }}" [style.background]="c.color"></div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="title">Triangle</div>
                    <div class="list">
                        <div class="item" *ngFor="let c of (shapeService.triangle$ | async)">
                            <div class="{{ c.shape }}" [style.border-bottom-color]="c.color"></div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="title">Square</div>
                    <div class="list">
                        <div class="item" *ngFor="let c of (shapeService.square$ | async)">
                            <div class="{{ c.shape }}" [style.background]="c.color"></div>
                        </div>
                    </div>
                </div>
            </div>
        </ng-container>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            div.vertical {
                min-height: 100%;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
            }

            div.horizontal {
                min-height: 450px;
                display: grid;
                grid-template-rows: repeat(3, 1fr);
            }

            .container {
                display: flex;
                flex-direction: column;
                padding: 0.5rem;
            }

            .container .title {
                text-decoration: underline;
                color: darkmagenta;
            }

            .list {
                display: grid;
                grid-template-columns: repeat(auto-fill, 4em);
                grid-auto-rows: 4em;
                grid-gap: 3px;
                margin-top: 15px;
            }

            .horizontal .list {
                grid-template-columns: repeat(auto-fill, 3em);
                grid-auto-rows: 3em;
            }

            .list .item {
                width: 100%;
                height: 100%;
            }

            .circle {
                height: 100%;
                border-radius: 50%;
            }

            .square {
                height: 100%;
            }

            .triangle {
                width: 0;
                height: 0;
                border-left: 2em solid transparent;
                border-right: 2em solid transparent;
                border-bottom: 4em solid black;
            }

            .horizontal .triangle {
                border-left-width: 1.5em;
                border-right-width: 1.5em;
                border-bottom-width: 3em;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMainComponent implements OnInit, OnDestroy {
    isSmallScreen$: Observable<boolean>;
    className$: Observable<string>;

    isSpeechSupported = 'speechSynthesis' in window;
    unsubscribe$ = new Subject();
    voice: any;

    private getVoices() {
        if (this.isSpeechSupported) {
            const synth = window.speechSynthesis;
            return new Promise(resolve => {
                setTimeout(() => {
                    const voices = synth.getVoices();
                    const engVoices = voices.filter(v => v.lang === 'en-US');
                    if (engVoices.length) {
                        return resolve(engVoices[0]);
                    }
                    return resolve(voices[0]);
                }, 0);
            });
        }
        return Promise.resolve(undefined);
    }

    constructor(public shapeService: ShapeService, private breakpointObserver: BreakpointObserver) {}

    ngOnInit() {
        this.className$ = this.breakpointObserver.observe(['(max-width: 599px)']).pipe(
            map(match => match.matches),
            map(isSmall => (isSmall ? 'horizontal' : 'vertical')),
        );

        if (this.isSpeechSupported) {
            this.getVoices().then(voice => (this.voice = voice));
            this.shapeService.speech$.pipe(takeUntil(this.unsubscribe$)).subscribe(text => {
                this.speak(text);
            });
        }
    }

    speak(text: string) {
        if (!this.isSpeechSupported || !this.shapeService.speechEnabled || !this.voice) {
            return;
        }
        const synth = window.speechSynthesis;
        if (synth.speaking) {
            console.log('Speaking in progress');
            return;
        }

        const utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = this.voice;
        synth.speak(utterThis);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
