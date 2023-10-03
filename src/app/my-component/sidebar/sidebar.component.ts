import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Department } from '../../my-modals/department';
import { DepartmentService } from '../../my-services/department.service';
import { JobTitleService } from '../../my-services/job-title.service';
import { JobTitle } from '../../my-modals/jobTitle';
import { Office } from '../../my-modals/office';
import { OfficeService } from '../../my-services/office.service';
import { EmployeeService } from 'src/app/my-services/employee.service';

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
  departmentId: string = "";
  officeId: string = "";
  jobTitleId: string = "";

  @Output() departmentFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() officeFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() jobTitleFilter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private departmentService: DepartmentService, private officeService: OfficeService, private jobTitleService: JobTitleService, private employeeService: EmployeeService) {

    this.getOffices();
    this.getJobTitle();
    this.getDepartments();
    this.employeeService.departmentCountUpdated.subscribe(() => {
      this.getDepartments();
    })
    this.employeeService.officeCountUpdated.subscribe(() => {
      this.getOffices();
    })
    this.employeeService.jobTitleCountUpdated.subscribe(() => {
      this.getJobTitle();
    })

  }
  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      (departments: Department[]) => {
        this.departments = departments;
      }, error => {

      });
  }
  getOffices() {
    this.officeService.getOffices().subscribe(
      (offices: Office[]) => {
        this.offices = offices;
      }, error => {

      });
  }
  getJobTitle() {
    this.jobTitleService.getJobTitles().subscribe(
      (jobTitles: JobTitle[]) => {
        this.jobTitles = jobTitles;
      }, error => {

      });
  }

  handleDepartmentClick(deptId: string) {
    if (this.departmentId == deptId) {
      deptId = "";
      this.departmentId = deptId;
    }

    else {
      this.departmentId = deptId;
    }

    this.departmentFilter.emit(deptId);
  }

  handleOfficeClick(officeId: string) {
    if (this.officeId == officeId) {
      officeId = "";
      this.officeId = officeId;
    }
    else {
      this.officeId = officeId;
    }
    this.officeFilter.emit(officeId);
  }

  handleJobTitleClick(jobTitleId: string) {
    if (this.jobTitleId == jobTitleId) {
      jobTitleId = "";
      this.jobTitleId = jobTitleId;
    }
    else {
      this.jobTitleId = jobTitleId;
    }
    this.jobTitleFilter.emit(jobTitleId);
  }
}


