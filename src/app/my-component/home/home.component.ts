import { Component, Input } from '@angular/core';
import { EmployeeService } from '../../my-services/employee.service';
import { Employee } from '../../my-modals/employee';
import { FilterObject } from '../../my-modals/filter-object';
import { observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() CharButton?: string;
  paginationchar?: string;
  searchTerm?: string;
  searchType?: string;
  departmentFilterValue?: string;
  officeFiltervalue?: string;
  jobTitleFilterValue?: string;
  employeeService?: EmployeeService
  filterObject: FilterObject = {
    departmentFilter: '',
    officeFilter: '',
    jobTitleFilter: '',
    searchTerm: '',
    searchType: '',
    paginationChar: ''
  };
  isDepartmentFilterClicked?: Boolean
  isOfficeFilterClicked?: Boolean
  isJobTitleFilterClicked?: boolean
   filterEmployees ?: Employee[];
  constructor(employeeService: EmployeeService, filterObject: FilterObject) {
    this.employeeService = employeeService;
    this.filterObject = filterObject;
  }
  getFilteredEmployees() {
    this.employeeService?.searchAndFilter(this.filterObject);

  }

  handleButtonClick(char: string) {
    this.paginationchar = char;
    this.filterObject.paginationChar = char;
    this.getFilteredEmployees();

  }

  handleDepartmentClick(selectedDepartmentId: string) {

    this.filterObject.departmentFilter = selectedDepartmentId;
    this.getFilteredEmployees();

  }
  handleOfficeClick(selectedOfficeId: string) {

    this.filterObject.officeFilter = selectedOfficeId;
    this.getFilteredEmployees();
  }

  handleJobTitleClick(selectedJobTitleId: string) {
    this.filterObject.jobTitleFilter = selectedJobTitleId;
    this.getFilteredEmployees();
  }

  handleSearchFilter(parameters: any[]) {
    let searchTerm = parameters[0];
    let searchType = parameters[1];
    this.filterObject.searchTerm = searchTerm;
    this.filterObject.searchType = searchType;
    this.getFilteredEmployees();
  }

  ngOnInit() {
    this.employeeService?.getEmployees().subscribe((data) => {
     this.filterEmployees = data;
    }, error => {

    });
  }
}