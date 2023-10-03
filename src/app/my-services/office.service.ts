import { Injectable } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';
import { Office } from '../my-modals/office';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private apiUrl = 'https://localhost:7152/api/office';
  offices: Office[] = [];

  constructor(private http: HttpClient) { }

  getOfficeById(officeId: any): Observable<Office> {
    const url = `${this.apiUrl}/${officeId}`;
    return this.http.get<Office>(url);
  }

  getOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(this.apiUrl)
      .pipe(
        map((offices: Office[]) => {
          this.offices = offices;
          return offices;
        })
      );
  }

  getOfficeList(): Office[] {
    return this.offices;
  }

  getOfficeByOffId(OfficeId: string) {
    let office = this.offices.find((o: Office) => o.id == OfficeId)
    if (office) {
      return office;
    }
    return null;
  }

  getOfficeIdByName(officeName: string): string {
    let office = this.offices.find((o: Office) => o.name == officeName);
    if (office) {
      return office.id;
    }
    return '';
  }
}