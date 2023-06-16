import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { JobTitle } from '../my-modals/jobTitle';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {
  
  private apiUrl = 'https://localhost:7152/api/jobTitle';
  jobTitles : JobTitle[] = [];
  
  constructor(private http: HttpClient) { }

  getJobTitleById(jobTitleId: any): Observable<JobTitle> {
    const url = `${this.apiUrl}/${jobTitleId}`;
    return this.http.get<JobTitle>(url);
  }

  getJobTitles(): Observable<JobTitle[]> {
    return this.http.get<JobTitle[]>(this.apiUrl)
    .pipe(
      map((jobTitles: JobTitle[]) => {
        this.jobTitles = jobTitles;
        return jobTitles;
      })
    );
  }

  getJobTitleList(): JobTitle[]{
    return this.jobTitles;
  }

  getJobTitleByJobId(JobTitleId : string){
    let jobTitle = this.jobTitles.find((j:JobTitle) => j.id == JobTitleId)
    return jobTitle;
  }

  getJobTitleIdByName(jobTitleName :string):string{
    let JobTitle = this.jobTitles.find((j:JobTitle) => j.name == jobTitleName);
    if(JobTitle){
      return JobTitle.id;
    }
    return '';
  }
}
