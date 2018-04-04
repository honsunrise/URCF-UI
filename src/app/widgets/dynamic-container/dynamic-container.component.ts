import {
  AfterViewInit,
  Compiler,
  Component,
  ComponentRef,
  Input,
  NgModuleFactoryLoader,
  OnDestroy,
  SystemJsNgModuleLoader,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

declare const System;

@Component({
  selector: 'dynamic-container',
  templateUrl: './dynamic-container.component.html',
  styleUrls: ['./dynamic-container.component.scss'],
  providers: [
    {
      provide: NgModuleFactoryLoader,
      useClass: SystemJsNgModuleLoader
    }
  ]
})
export class DynamicContainerComponent implements OnDestroy, AfterViewInit {
  @ViewChild('container', {read: ViewContainerRef}) vcRef: ViewContainerRef;
  @Input() modulePath: string;
  @Input() moduleName: string;
  loaded: boolean;
  private compRef: ComponentRef<any>;

  constructor(public compiler: Compiler) {
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
    console.log(System);
    System.import(`${this.modulePath}#${this.moduleName}`).then((module) => {
      this.compiler.compileModuleAndAllComponentsAsync(module.LazyModule)
        .then((compiled) => {
          const vcRef = this.vcRef;
          const ngModuleRef = compiled.ngModuleFactory.create(vcRef.parentInjector);
          const factory = compiled.componentFactories[0];
          this.compRef = vcRef.createComponent(factory, 0, ngModuleRef.injector);
          this.loaded = true;
        });
    });
  }

  ngOnDestroy() {
    if (this.compRef && this._inited) {
      this.compRef.destroy();
    }
  }

  ngAfterViewInit(): void {
    this.inited = true;
  }
}
