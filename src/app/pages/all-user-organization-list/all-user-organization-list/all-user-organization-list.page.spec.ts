import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllUserOrganizationListPage } from './all-user-organization-list.page';

describe('AllUserOrganizationListPage', () => {
  let component: AllUserOrganizationListPage;
  let fixture: ComponentFixture<AllUserOrganizationListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllUserOrganizationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
