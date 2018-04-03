import {
  Component,
  ComponentRef,
  Input,
  NgModuleFactory,
  OnDestroy,
  SystemJsNgModuleLoader,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'dynamic-container',
  templateUrl: './dynamic-container.component.html',
  styleUrls: ['./dynamic-container.component.scss'],
})
export class DynamicContainerComponent implements OnDestroy {
  @ViewChild('container', {read: ViewContainerRef}) vcRef: ViewContainerRef;
  @Input() modulePath: string;
  @Input() moduleName: string;
  loaded: boolean;
  private compRef: ComponentRef<any>;

  constructor(private moduleLoader: SystemJsNgModuleLoader) {
  }

  private _inited: boolean;

  get inited() {
    return this._inited;
  }

  set inited(val: boolean) {
    if (val) {
      this.loadComponent();
    }
    this._inited = val;
  }

  loadComponent() {
    this.moduleLoader.load(`${this.modulePath}#${this.moduleName}`)
      .then((moduleFactory: NgModuleFactory<any>) => {
        const vcRef = this.vcRef;
        const entryComponent = (<any>moduleFactory.moduleType).entry;
        const ngModuleRef = moduleFactory.create(vcRef.parentInjector);
        const compFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);
        this.compRef = vcRef.createComponent(compFactory, 0, ngModuleRef.injector);

        this.loaded = true;
      });
  }

  ngOnDestroy() {
    this.compRef.destroy();
  }
}
