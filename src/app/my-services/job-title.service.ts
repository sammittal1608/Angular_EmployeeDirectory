import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JobTitle } from '../my-modals/jobTitle';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  constructor() { }
  getJobTitle(): Observable<JobTitle[]> {
    let jobTitles = localStorage.getItem('jobTitles');
    if (jobTitles) {
      let data = JSON.parse(jobTitles);
      return of(data);
    } else {
      let jobTitleList = [
        new JobTitle({ id: 1, name: 'SharePoint Practice Head', count: 0 }),
        new JobTitle({ id: 2, name: '.Net Development Lead', count: 0 }),
        new JobTitle({ id: 3, name: 'Recruiting Expert', count: 0 }),
        new JobTitle({ id: 4, name: 'BI Developer', count: 0 }),
        new JobTitle({ id: 5, name: 'Business Analyst', count: 0 })
      ]
      localStorage.setItem('jobTitles', JSON.stringify(jobTitleList));
      return of(jobTitleList);
    }
  }
  getJobTitleById(jobTitleId: any): any {
    let JobTitles = localStorage.getItem('jobTitles');
    if (JobTitles) {
      let data = JSON.parse(JobTitles);
      let jobTitle = data.find((j: JobTitle) => Number(j.id) == jobTitleId);
      return jobTitle;
    }
    return null;

  }
  updateJobTitleCount(jobTitleName: JobTitle): void {
    let jobTitles = JSON.parse(localStorage.getItem('jobTitles') || '[]');
    let jobTitleIndex: number = jobTitles.findIndex((j: JobTitle) => j.id === jobTitleName.id);
    if (jobTitleIndex !== -1) {
      jobTitles[jobTitleIndex].count++;
      localStorage.setItem('jobTitles', JSON.stringify(jobTitles));
    }
  }
  updateEditJobTitleCount(jobTitleName: JobTitle): void {
    let jobTitles = JSON.parse(localStorage.getItem('jobTitles') || '[]');
    let jobTitleIndex: number = jobTitles.findIndex((j: JobTitle) => j.id === jobTitleName.id);
    if (jobTitleIndex !== -1) {
      jobTitles[jobTitleIndex].count--;
      localStorage.setItem('jobTitles', JSON.stringify(jobTitles));

    }
  }
}
