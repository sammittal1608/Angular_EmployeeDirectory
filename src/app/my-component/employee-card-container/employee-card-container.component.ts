import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Employee } from '../../my-modals/employee';
import { EmployeeService } from '../../my-services/employee.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterObject } from 'src/app/my-modals/filter-object';

@Component({
  selector: 'app-employee-card-container',
  templateUrl: './employee-card-container.component.html',
  styleUrls: ['./employee-card-container.component.css']
})
export class EmployeeCardContainerComponent {
  employees: Employee[] = [];
  openEditForm: boolean = false;
  editEmployee?: Employee;
  isEditEmployeeForm: boolean = false;
  modalRef!: BsModalRef;
  @ViewChild('template') editModal!: TemplateRef<any>;
  @Output() employeeDetails: EventEmitter<Employee> = new EventEmitter<Employee>();
  filteredEmployees?: Employee[] = [];
  filterObject?: FilterObject;

  constructor(private modalService: BsModalService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.filtersUpdated.subscribe((filters: FilterObject) => {
      this.filterObject = filters;
      this.filterAndRenderEmployees(true);
    });
    this.employeeService.employeesUpdated.subscribe(() => {
      this.getEmployees();
    });

    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filterAndRenderEmployees();
    });
  }

  filterAndRenderEmployees(applyFilters = false) {
    let filteredEmployees = this.employees;
    if (applyFilters) {
      if (this.filterObject?.paginationChar && this.filterObject?.paginationChar !== "") {
        filteredEmployees = filteredEmployees.filter((employee) =>
          employee.firstName?.charAt(0).toUpperCase() === this.filterObject?.paginationChar?.toUpperCase()
        );
      }

      if (this.filterObject?.departmentFilter && this.filterObject?.departmentFilter !== "") {
        let departmentId = this.filterObject.departmentFilter;
        filteredEmployees = filteredEmployees.filter(employee => employee.department == departmentId);
      }

      if (this.filterObject?.jobTitleFilter && this.filterObject?.jobTitleFilter !== "") {
        let jobTitleId = this.filterObject.jobTitleFilter;
        filteredEmployees = filteredEmployees.filter(employee => employee.jobTitle == jobTitleId);
      }

      if (this.filterObject?.officeFilter && this.filterObject?.officeFilter !== "") {
        let officeId = this.filterObject.officeFilter;
        filteredEmployees = filteredEmployees.filter(employee => employee.office == officeId);
      }

      if (this.filterObject?.searchTerm !== undefined && this.filterObject?.searchTerm !== "") {
        const searchType = this.filterObject.searchType;
        const searchTerm = this.filterObject.searchTerm;

        if (searchType) {
          filteredEmployees = filteredEmployees.filter((employee) =>
            (employee as any)[searchType].toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      }
    }
    this.filteredEmployees = filteredEmployees;
  }

  handleCardClick(employee: Employee) {
    this.isEditEmployeeForm = true;
    this.openEditForm = true;
    this.editEmployee = employee;
    this.openModal();
  }

  openModal() {
    this.modalRef = this.modalService?.show(this.editModal);
  }

  closeModal() {
    this.modalService?.hide();
    this.openEditForm = false;
  }
}
