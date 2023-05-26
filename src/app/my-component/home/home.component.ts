import { Component, Input } from '@angular/core';
import { EmployeeService } from '../../my-services/employee.service';
import { Employee } from '../../my-modals/employee';
import { FilterObject } from '../../my-modals/filter-object';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() CharButton?: string;
  // paginationchar?: string;
  // searchTerm?: string;
  // searchType?: string;
  // departmentFilterValue?: string;
  // officeFiltervalue?: string;
  // jobTitleFilterValue?: string;
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

  filterEmployees?: Employee[] = this.employeeService?.getEmployeeList();
  constructor(employeeService: EmployeeService, filterObject: FilterObject) {
    this.employeeService = employeeService;
    this.filterObject = filterObject;
  }
  getFilteredEmployees() {
    //call the service method by passing search and filter object
    this.filterEmployees = this.employeeService?.searchAndFilter(this.filterObject);

  }

  handleButtonClick(char: string) {
    // this.paginationchar = char;
    this.filterObject.paginationChar = char;

    //update the search and filter object
    this.getFilteredEmployees();
    // this.filterEmployees = this.employeeService?.alphabetSearch(char);

  }
  // searchFilter(searchValue: string, seachType: string) {
  //  this.filterObject.searchTerm =this.searchTerm;
  //  this.filterObject.searchType = this.searchType;
  //  this.getFilteredEmployees();
  //   // this.filterEmployees =this.employeeService?.searchFilter(searchValue, seachType);
  // }
  handleDepartmentClick(departmentValue: string) {

    this.filterObject.departmentFilter = departmentValue;
    this.getFilteredEmployees();
    // this.departmentFilterValue = departmentValue;
    // this.filterEmployees =this.employeeService?.departmentFilter(departmentValue.name);

  }
  handleOfficeClick(officeValue: string) {
    // this.officeFiltervalue = officeValue;
    this.filterObject.officeFilter = officeValue;
    this.getFilteredEmployees();
    //  this.filterEmployees=  this.employeeService?.officeFilter(officeValue.name);
  }
  handleJobTitleClick(jobTitleValue: string) {
    // this.jobTitleFilterValue = jobTitleValue;
    this.filterObject.jobTitleFilter = jobTitleValue;
    this.getFilteredEmployees();
    // this.filterEmployees = this.employeeService?.jobTitleFilter(jobTitleValue.name);
  }
  // Parent component
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
    });
  }
}