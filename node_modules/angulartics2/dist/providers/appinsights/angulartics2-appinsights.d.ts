import { Angulartics2 } from '../../core/angulartics2';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
export declare class Angulartics2AppInsights {
    private angulartics2;
    private title;
    private router;
    loadStartTime: number;
    loadTime: number;
    metrics: any;
    dimensions: any;
    measurements: any;
    constructor(angulartics2: Angulartics2, title: Title, router: Router);
    startTimer(): void;
    stopTimer(): void;
    pageTrack(path: string): void;
    eventTrack(name: string, properties: any): void;
    exceptionTrack(properties: any): void;
    setUsername(userId: string): void;
    setUserProperties(properties: any): void;
}
