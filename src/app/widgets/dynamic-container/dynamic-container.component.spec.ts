import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicContainerComponent} from './media-card.component';

describe('MediaCardComponent', () => {
  let component: DynamicContainerComponent;
  let fixture: ComponentFixture<DynamicContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
