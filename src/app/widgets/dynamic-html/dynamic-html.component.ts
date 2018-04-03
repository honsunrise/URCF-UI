/**
 * Modify from https://github.com/lacolaco/ng-dynamic
 */
import {Component, DoCheck, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges,} from '@angular/core';

import {DynamicHTMLRef, DynamicHTMLRenderer} from './renderer';

/**
 * ComponentOutlet is a directive to create dynamic component.
 *
 * Example:
 *
 * ```ts
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <dynamic-html [content]="content"></dynamic-html>
 *   `
 * })
 * export class AppComponent {
 *   content = `
 *   <article>
 *     <h1>Awesome Document</h1>
 *     <div>
 *       <p>bla bla bla</p>
 *       <my-button></my-button>
 *     </div>
 *   </article>
 *   `;
 * }
 * ```
 *
 */
@Component({
  selector: 'dynamic-html',
  template: '',
})
export class DynamicHTMLComponent implements DoCheck, OnChanges, OnDestroy {
  @Input() content: string;

  private ref: DynamicHTMLRef = null;

  constructor(
    private renderer: DynamicHTMLRenderer,
    private elementRef: ElementRef,
  ) {
  }

  ngOnChanges(_: SimpleChanges) {
    if (this.ref) {
      this.ref.destroy();
      this.ref = null;
    }
    if (this.content && this.elementRef) {
      this.ref = this.renderer.renderInnerHTML(this.elementRef, this.content);
    }
  }

  ngDoCheck() {
    if (this.ref) {
      this.ref.check();
    }
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.destroy();
      this.ref = null;
    }
  }
}
