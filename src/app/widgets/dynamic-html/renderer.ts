import {ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, Injectable, Injector} from '@angular/core';
import {DynamicHTMLOptions} from './options';
import {OnMount} from './interfaces';

export interface DynamicHTMLRef {
  check: () => void;
  destroy: () => void;
}

function isBrowserPlatform() {
  return window != null && window.document != null;
}

@Injectable()
export class DynamicHTMLRenderer {

  private componentFactories = new Map<string, ComponentFactory<any>>();

  private componentRefs = new Map<any, Array<ComponentRef<any>>>();

  constructor(private options: DynamicHTMLOptions, private cfr: ComponentFactoryResolver, private injector: Injector) {
    this.options.components.forEach((component) => {
      let cf: ComponentFactory<any>;
      cf = this.cfr.resolveComponentFactory(component);
      this.componentFactories.set(cf.selector, cf);
    });
  }

  renderInnerHTML(elementRef: ElementRef, html: string): DynamicHTMLRef {
    if (!isBrowserPlatform()) {
      throw new Error('dynamic-html supports only browser platform.');
    }
    elementRef.nativeElement.innerHTML = html;

    const componentRefs: Array<ComponentRef<any>> = [];
    this.componentFactories.forEach((factory, selector) => {
      const elements = elementRef.nativeElement.querySelectorAll(selector);
      Array.prototype.forEach.call(elements, (element: Element) => {
        const projectableNodes = [Array.prototype.slice.call(element.childNodes)];
        const embeddedComponent = factory.create(this.injector, projectableNodes, element);
        element.removeAttribute('ng-version');
        if (embeddedComponent.instance.dynamicOnMount) {
          const attrsMap = new Map<string, string>();
          if (element.hasAttributes()) {
            Array.prototype.forEach.call(element.attributes, (attr: Attr) => {
              attrsMap.set(attr.name, attr.value);
            });
          }
          (embeddedComponent.instance as OnMount).dynamicOnMount(attrsMap, element);
        }
        for (const attr of (element as any).attributes) {
          embeddedComponent.instance[attr.nodeName] = attr.nodeValue;
        }
        componentRefs.push(embeddedComponent);
      });
    });

    this.componentRefs.set(elementRef, componentRefs);
    return {
      check: () => componentRefs.forEach(ref => ref.changeDetectorRef.detectChanges()),
      destroy: () => {
        componentRefs.forEach(ref => ref.destroy());
        this.componentRefs.delete(elementRef);
      },
    };
  }
}
