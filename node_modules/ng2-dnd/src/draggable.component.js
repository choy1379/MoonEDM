// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ChangeDetectorRef } from '@angular/core';
import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { AbstractComponent, AbstractHandleComponent } from './abstract.component';
import { DragDropConfig } from './dnd.config';
import { DragDropService } from './dnd.service';
var DraggableComponent = (function (_super) {
    __extends(DraggableComponent, _super);
    function DraggableComponent(elemRef, dragDropService, config, cdr) {
        var _this = _super.call(this, elemRef, dragDropService, config, cdr) || this;
        /**
         * Callback function called when the drag actions happened.
         */
        _this.onDragStart = new EventEmitter();
        _this.onDragEnd = new EventEmitter();
        /**
         * Callback function called when the drag action ends with a valid drop action.
         * It is activated after the on-drop-success callback
         */
        _this.onDragSuccessCallback = new EventEmitter();
        _this._defaultCursor = _this._elem.style.cursor;
        _this.dragEnabled = true;
        return _this;
    }
    Object.defineProperty(DraggableComponent.prototype, "draggable", {
        set: function (value) {
            this.dragEnabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "dropzones", {
        set: function (value) {
            this.dropZones = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "effectallowed", {
        /**
         * Drag allowed effect
         */
        set: function (value) {
            this.effectAllowed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "effectcursor", {
        /**
         * Drag effect cursor
         */
        set: function (value) {
            this.effectCursor = value;
        },
        enumerable: true,
        configurable: true
    });
    DraggableComponent.prototype._onDragStartCallback = function (event) {
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        this._elem.classList.add(this._config.onDragStartClass);
        //
        this.onDragStart.emit({ dragData: this.dragData, mouseEvent: event });
    };
    DraggableComponent.prototype._onDragEndCallback = function (event) {
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        this._elem.classList.remove(this._config.onDragStartClass);
        //
        this.onDragEnd.emit({ dragData: this.dragData, mouseEvent: event });
    };
    return DraggableComponent;
}(AbstractComponent));
export { DraggableComponent };
DraggableComponent.decorators = [
    { type: Directive, args: [{ selector: '[dnd-draggable]' },] },
];
/** @nocollapse */
DraggableComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DragDropService, },
    { type: DragDropConfig, },
    { type: ChangeDetectorRef, },
]; };
DraggableComponent.propDecorators = {
    'draggable': [{ type: Input, args: ["dragEnabled",] },],
    'onDragStart': [{ type: Output },],
    'onDragEnd': [{ type: Output },],
    'dragData': [{ type: Input },],
    'onDragSuccessCallback': [{ type: Output, args: ["onDragSuccess",] },],
    'dropzones': [{ type: Input, args: ["dropZones",] },],
    'effectallowed': [{ type: Input, args: ["effectAllowed",] },],
    'effectcursor': [{ type: Input, args: ["effectCursor",] },],
    'dragImage': [{ type: Input },],
    'cloneItem': [{ type: Input },],
};
var DraggableHandleComponent = (function (_super) {
    __extends(DraggableHandleComponent, _super);
    function DraggableHandleComponent(elemRef, dragDropService, config, _Component, cdr) {
        return _super.call(this, elemRef, dragDropService, config, _Component, cdr) || this;
    }
    return DraggableHandleComponent;
}(AbstractHandleComponent));
export { DraggableHandleComponent };
DraggableHandleComponent.decorators = [
    { type: Directive, args: [{ selector: '[dnd-draggable-handle]' },] },
];
/** @nocollapse */
DraggableHandleComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DragDropService, },
    { type: DragDropConfig, },
    { type: DraggableComponent, },
    { type: ChangeDetectorRef, },
]; };
