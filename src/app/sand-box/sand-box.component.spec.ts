import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandBoxComponent } from './sand-box.component';

describe('SandBoxComponent', () => {
  let component: SandBoxComponent;
  let fixture: ComponentFixture<SandBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SandBoxComponent]
    });
    fixture = TestBed.createComponent(SandBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
