import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { STORAGE_KEYS } from 'src/app/constants/pages/App-settings';

@Injectable({
  providedIn: 'root'
})
export class GlobalvariablesService {
  orgId: any;
  Organisationname: any;
  constructor(
    private storage: Storage
  ) { }

  setOrgId(value: any) {
    localStorage.setItem("orgId", value);
    this.orgId = value;
  };

  getOrgId(): string {
    return localStorage.getItem('orgId') || '7923'
  }

  setAllUserOrganization(value: any) {
    localStorage.setItem('isAllUserOrganizationSelected', value)
  };

  getAllUserOrganization(): any {
    return localStorage.getItem('isAllUserOrganizationSelected') || false;
  }

  setInvOrgId(value: any) {
    localStorage.setItem("inv_org_id", value);
  }

  getInvOrgId() {
    return localStorage.getItem("inv_org_id");
  }

  setInvOrgCode(value: any) {
    localStorage.setItem("inv_org_code", value);
  }

  getInvOrgCode() {
    return localStorage.getItem("inv_org_code");
  }

  setOrganisationname(value: any) {
    localStorage.setItem("Organisationname", value);
    this.Organisationname = value;
  }

  getOrganisationname() {
    return this.Organisationname || localStorage.getItem("Organisationname");
  }

  setUsername(value: any) {
    localStorage.setItem("username", value);
  }

  getUsername() {
    return localStorage.getItem("username") || '';
  }

  setUserId(value: any) {
    localStorage.setItem("userId", value);
  }
  getUserId() {
    return localStorage.getItem("userId");
  }

  setPersonId(value: any) {
    localStorage.setItem("personId", value);
  }

  getPersonId() {
    return localStorage.getItem("personId")
  }


  //storage using sqLite

  setUserDetails(value: any) {
    this.storage.set(STORAGE_KEYS.userDetails, value);
  };

  getUserDetails() {
    return this.storage.get(STORAGE_KEYS.userDetails);
  };

  setUserName(value: any) {
    this.storage.set(STORAGE_KEYS.userName, value);
  };

  getUserName () {
    return this.storage.get(STORAGE_KEYS.userName);
  };

  setInventoryOrgCode (value: any) {
    this.storage.set(STORAGE_KEYS.inventoryOrgCode, value)
  }

  setInventoryOrgId (value: any) {
    this.storage.set(STORAGE_KEYS.invOrgId, value)
  }

}
