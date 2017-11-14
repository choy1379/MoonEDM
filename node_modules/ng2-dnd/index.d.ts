import { ModuleWithProviders } from "@angular/core";
import { DragDropConfig } from './src/dnd.config';
import { DragDropService, DragDropSortableService } from './src/dnd.service';
export * from './src/abstract.component';
export * from './src/dnd.config';
export * from './src/dnd.service';
export * from './src/draggable.component';
export * from './src/droppable.component';
export * from './src/sortable.component';
export declare let providers: (typeof DragDropConfig | {
    provide: typeof DragDropService;
    useFactory: () => DragDropService;
} | {
    provide: typeof DragDropSortableService;
    useFactory: (config: DragDropConfig) => DragDropSortableService;
    deps: typeof DragDropConfig[];
})[];
export declare class DndModule {
    static forRoot(): ModuleWithProviders;
}
