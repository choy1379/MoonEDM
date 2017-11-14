import { ElementRef, OnInit, OnChanges, OnDestroy, NgZone, SimpleChanges } from '@angular/core';
import { FormArray } from '@angular/forms';
import { SortablejsOptions } from './sortablejs-options';
export declare class SortablejsDirective implements OnInit, OnChanges, OnDestroy {
    private element;
    private zone;
    items: any[] | FormArray;
    inputOptions: SortablejsOptions;
    private _sortable;
    runInsideAngular: boolean;
    constructor(element: ElementRef, zone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private readonly options;
    private proxyEvent(eventName, event);
    private readonly bindingEnabled;
    private readonly overridenOptions;
}
