import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsncodesComponent } from './hsncodes.component';

xdescribe('HsncodesComponent', () => {
  let component: HsncodesComponent;
  let fixture: ComponentFixture<HsncodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsncodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsncodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
