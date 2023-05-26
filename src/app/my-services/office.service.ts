import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Office } from '../my-modals/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor() { }
  getOffice(): Observable<Office[]> {
    let offices = localStorage.getItem('offices');
    if (offices) {
      let data = JSON.parse(offices);
      return of(data);
    }
    else {
      let officeList = [
        new Office({ id: 1, name: 'Seattle', count: 0 }),
        new Office({ id: 2, name: 'India', count: 0 }),

      ]
      localStorage.setItem('offices', JSON.stringify(officeList));
      return of(officeList);
    }
  }
  getOfficeById(officeId: any): any {
    let offices = localStorage.getItem('offices');
    if (offices) {
      let data = JSON.parse(offices);
      let office = data.find((o: Office) => Number(o.id) == officeId);
      return office;
    } 
    else {
      return null;
    }
  }
  updateOfficeCount(officeName: Office): void {
    let offices: Office[] = JSON.parse(localStorage.getItem('offices') || '[]');
    let officeIndex: number = offices.findIndex((d: Office) => d.id === officeName.id);

    if (officeIndex !== -1) {
      offices[officeIndex].count++;
      localStorage.setItem('offices', JSON.stringify(offices));
    }
  }
  updateEditOfficeCount(officeName: Office): void {
    let offices: Office[] = JSON.parse(localStorage.getItem('offices') || '[]');
    let officeIndex: number = offices.findIndex((d: Office) => d.id === officeName.id);

    if (officeIndex !== -1) {
      offices[officeIndex].count--;
      localStorage.setItem('offices', JSON.stringify(offices));
    }
  }
}