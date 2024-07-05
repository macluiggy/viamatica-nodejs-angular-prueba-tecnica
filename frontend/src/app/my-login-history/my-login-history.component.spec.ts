import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLoginHistoryComponent } from './my-login-history.component';

describe('MyLoginHistoryComponent', () => {
  let component: MyLoginHistoryComponent;
  let fixture: ComponentFixture<MyLoginHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLoginHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyLoginHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
