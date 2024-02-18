import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalvariablesService {
  orgId: any;
  Organisationname:any;
  constructor() { }

  setOrgId(value:any) {
    localStorage.setItem("orgId", value);
    this.orgId = value;
  };

  getOrgId () : string{
    return localStorage.getItem('orgId') || '7923'
  }

  setAllUserOrganization(value:any){
    localStorage.setItem('isAllUserOrganizationSelected',value)
  };

  getAllUserOrganization():any{
    return localStorage.getItem('isAllUserOrganizationSelected') || false;
  }

  setInvOrgId(value:any) {
    localStorage.setItem("inv_org_id", value);
  }

  getInvOrgId() {
    return localStorage.getItem("inv_org_id");
  }

  setInvOrgCode(value:any) {
    localStorage.setItem("inv_org_code", value);
  }

  getInvOrgCode() {
    return localStorage.getItem("inv_org_code");
  }

  setOrganisationname(value:any) {
    localStorage.setItem("Organisationname", value);
    this.Organisationname = value;
  }

  getOrganisationname() {
    return this.Organisationname || localStorage.getItem("Organisationname");
  }
}
