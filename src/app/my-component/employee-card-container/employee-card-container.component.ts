import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Employee } from '../../my-modals/employee';
import { EmployeeService } from '../../my-services/employee.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-employee-card-container',
  templateUrl: './employee-card-container.component.html',
  styleUrls: ['./employee-card-container.component.css']
})
export class EmployeeCardContainerComponent {
  employees: Employee[] = [];
  openEditForm: boolean = false;
  editEmployee ?: Employee;
  isEditEmployeeForm : boolean = false;
  modalRef!: BsModalRef;
  @ViewChild('template') editModal!: TemplateRef<any>;
  @Output() employeeDetails: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Input() filteredEmployees?: Employee[];
  

  constructor(private modalService: BsModalService, private employeeService: EmployeeService) {}

  handleCardClick(employee: Employee) {
    this.isEditEmployeeForm =true;
    this.openEditForm = true;
    this.editEmployee=employee;
    this.openModal();
    
  }

  openModal() {
    this.modalRef = this.modalService.show(this.editModal);
  }

  closeModal() {
    this.modalService.hide();
    this.openEditForm = false;
  }
}
