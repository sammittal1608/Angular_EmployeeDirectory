import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Department } from '../../my-modals/department';
import { DepartmentService } from '../../my-services/department.service';
import { JobTitleService } from '../../my-services/job-title.service';
import { JobTitle } from '../../my-modals/jobTitle';
import { Office } from '../../my-modals/office';
import { OfficeService } from '../../my-services/office.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  departments: Department[] = [];
  offices: Office[] = [];
  jobTitles: JobTitle[] = [];

  isDepartmentFilterClicked?: Boolean = false;
  isOfficeFilterClicked?: Boolean = false;
  isJobTitleFilterClicked?: boolean = false;
  departmentName?: string = "";
  officeName?: string = "";
  jobTitleName?: string = "";

  @Output() departmentFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() officeFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() jobTitleFilter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private departmentService: DepartmentService, private officeService: OfficeService, private jobTitleService: JobTitleService) {
    this.departmentService.getDepartment().subscribe(
      (departments: Department[]) => {
        this.departments = departments;
      });
    this.officeService.getOffice().subscribe(
      (offices: Office[]) => {
        this.offices = offices;
      });
    this.jobTitleService.getJobTitle().subscribe(
      (jobTitles: JobTitle[]) => {
        this.jobTitles = jobTitles;
      });
  }
  handleDepartmentClick(dept: string) {
    if (!this.isDepartmentFilterClicked) {

      this.isDepartmentFilterClicked = !this.isDepartmentFilterClicked;
      this.departmentName = dept;
    }
    else {
      this.isDepartmentFilterClicked = !this.isDepartmentFilterClicked;
      dept = "";
      this.departmentName = dept;
    }
    this.departmentFilter.emit(dept);
  }

  handleOfficeClick(office: string) {
    if (!this.isOfficeFilterClicked) {
      this.isOfficeFilterClicked = !this.isOfficeFilterClicked;
      this.officeName = office;
    }
    else {
      this.isOfficeFilterClicked = !this.isOfficeFilterClicked;
      office = "";
      this.officeName = office;
    }
    this.officeFilter.emit(office);
  }

  handleJobTitleClick(jobTitle: string) {
    if (!this.isJobTitleFilterClicked) {
      this.isJobTitleFilterClicked = !this.isJobTitleFilterClicked;
      this.jobTitleName = jobTitle
    }
    else {
      this.isJobTitleFilterClicked = !this.isJobTitleFilterClicked;
      jobTitle = "";
      this.jobTitleName = jobTitle;
    }
    this.jobTitleFilter.emit(jobTitle);
  }
}


