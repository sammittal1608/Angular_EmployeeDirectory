import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Employee } from '../my-modals/employee';
import { FilterObject } from '../my-modals/filter-object';
import { Department } from '../my-modals/department';
import { DepartmentService } from './department.service';
import { JobTitle } from '../my-modals/jobTitle';
import { JobTitleService } from './job-title.service';
import { OfficeService } from './office.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  departmenetService?: DepartmentService;
  jobTitleService?:JobTitleService;
  officeService ?: OfficeService

  constructor(departmentService : DepartmentService,officeService: OfficeService , jobTitleService : JobTitleService){
    this.departmenetService = departmentService;
    this.jobTitleService =jobTitleService;
    this.officeService = officeService;
  }
  [x: string]: any;
  // private employee = new BehaviorSubject<any>(null);
  // currentEmployee = this.employee.asObservable();
  // firstLetter ?: string = '';
  // searchTerm ?: string = '';
  // searchCriteria ?: string='';
  // filterByDepart ?:string='';
  // filterByOff ?:string='';
  // filterByJob ?: string='';

  getEmployeeList(): Employee[] {
    let data = localStorage.getItem('employee');
    if (data) {
      let employees = JSON.parse(data);
      return employees;
    }
    return [];
  }
  employees: Employee[] = this.getEmployeeList();

  filteredEmployees: Employee[] = this.employees;

  addEmployee(employee: Employee) {
    this.employees.push(employee);
    localStorage.setItem('employee', JSON.stringify(this.employees));
  }

  getEmployees(): Observable<Employee[]> {
    let empList = localStorage.getItem('employee');
    if (empList) {
      let employeesList = JSON.parse(empList);
      return of(employeesList);
    }
    return of([]);
  }
  // alphabetSearch(SearchChar : string){
  //   this.firstLetter=SearchChar;
  //   let filterEmployee =this.searchAndFilter();
  //   return filterEmployee;
  // }
  // searchFilter(searchFilterValue : string,seachTypeValue:string){
  //   this.searchTerm=searchFilterValue;
  //   this.searchCriteria=seachTypeValue;
  //   let filterEmployee = this.searchAndFilter();
  //   return filterEmployee;
  // }
  // departmentFilter(departmentName: string){
  //   this.filterByDepart=departmentName;
  //   let filterEmployee = this.searchAndFilter();
  //   return filterEmployee;

  // }
  // officeFilter(officeName:string){
  //   this.filterByOff=officeName;
  //  let filterEmployees= this.searchAndFilter();
  //  return filterEmployees;
  // }
  // jobTitleFilter(jobTitleName:string){
  //   this.filterByJob=jobTitleName;
  //   let filterEmployees:Employee[] = this.searchAndFilter();
  //   return filterEmployees;
  // }
  searchAndFilter(filterObject: FilterObject): Employee[] {
    let filteredEmployees: Employee[] = this.employees; // Assuming `employees` is the array of employees you want to filter

    if (filterObject.paginationChar && filterObject.paginationChar !== "") {
      filteredEmployees = filteredEmployees.filter((employee) =>
        employee.firstName.charAt(0).toUpperCase() === filterObject.paginationChar?.toUpperCase()
      );
    }

    if (filterObject.departmentFilter && filterObject.departmentFilter !== "") {
      let departmentName = filterObject.departmentFilter;
      filteredEmployees = filteredEmployees.filter(employee => this.departmenetService?.getDepartmentById(employee.department).name == departmentName);
    }


    if (filterObject.jobTitleFilter && filterObject.jobTitleFilter !== "") {
      let JobTitleName = filterObject.jobTitleFilter;
      filteredEmployees = filteredEmployees.filter(employee => this.jobTitleService?.getJobTitleById(employee.jobTitle).name == JobTitleName);
    }

    if (filterObject.officeFilter && filterObject.officeFilter !== "") {
     let officeName = filterObject.officeFilter;
      filteredEmployees = filteredEmployees.filter(employee => this.officeService?.getOfficeById(employee.office).name == officeName);
    }

    if (filterObject.searchTerm && filterObject.searchType !== undefined && filterObject.searchTerm !== "") {
      let searchType = filterObject.searchType;
      let searchTerm = filterObject.searchTerm;

      if(searchType ==='department'){
        filteredEmployees = filteredEmployees.filter((employee) =>
        (this.departmenetService?.getDepartmentById(employee[searchType])).name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return filteredEmployees;}
        if(searchType ==='office'){
          filteredEmployees = filteredEmployees.filter((employee) =>
          (this.officeService?.getOfficeById(employee[searchType])).name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        return filteredEmployees;}
          if(searchType ==='jobTitle'){
            filteredEmployees = filteredEmployees.filter((employee) =>
            (this.jobTitleService?.getJobTitleById(employee[searchType])).name.toLowerCase().includes(searchTerm.toLowerCase())
            );filteredEmployees;}
            filteredEmployees = filteredEmployees.filter((employee) =>
              employee[searchType].toLowerCase().includes(searchTerm.toLowerCase())
            );
      
    }return filteredEmployees;
  }
}