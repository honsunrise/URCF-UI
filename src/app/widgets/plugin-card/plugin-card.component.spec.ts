import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PluginCardComponent} from './plugin-card.component';

describe('PluginCardComponent', () => {
  let component: PluginCardComponent;
  let fixture: ComponentFixture<PluginCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PluginCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
