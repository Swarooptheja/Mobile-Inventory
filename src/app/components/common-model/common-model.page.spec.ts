import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModelPage } from './common-model.page';

describe('CommonModelPage', () => {
  let component: CommonModelPage;
  let fixture: ComponentFixture<CommonModelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommonModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
