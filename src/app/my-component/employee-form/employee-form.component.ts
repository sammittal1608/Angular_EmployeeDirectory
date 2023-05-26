import { Component, EventEmitter, Input, NgModuleFactory, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../my-modals/employee';
import { EmployeeService } from '../../my-services/employee.service';
import { Subject } from 'rxjs';
import { DepartmentService } from '../../my-services/department.service';
import { OfficeService } from '../../my-services/office.service';
import { JobTitleService } from '../../my-services/job-title.service';
import { Department } from '../../my-modals/department';
import { Office } from '../../my-modals/office';
import { JobTitle } from '../../my-modals/jobTitle';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @ViewChild('myModal') myModal: any;
  modalRef?: BsModalRef;
  @Input() editEmployee?: Employee;
  @Input() mode?: string;

  myForm: FormGroup;
  isFormSubmit?: boolean = false;
  isAddEmployeeForm: boolean = false;
  isEditEmployeeForm: boolean = false;


  @Output() employeeAdded: EventEmitter<any> = new EventEmitter();
  @Output() closeEditForm: EventEmitter<any> = new EventEmitter();
  @Output() closeAddForm: EventEmitter<any> = new EventEmitter();
  @Output() employeeEdited: EventEmitter<any> = new EventEmitter();
  employees: Employee[] = [];
  newEmployee: Employee = new Employee();
  private mySubject = new Subject<any>();

  departments: Department[] = [];
  offices: Office[] = [];
  jobTitles: JobTitle[] = [];

  constructor(private modalService: BsModalService, private employeeService: EmployeeService, private departmentService: DepartmentService, private officeService: OfficeService, private jobTitleService: JobTitleService) {
    this.myForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      jobTitle: new FormControl('', [Validators.required]),
      office: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      skypeId: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  @Input() employee !: Employee;
  ngOnInit() {
    if (this.editEmployee) {
      this.newEmployee = this.editEmployee;
      this.myForm.patchValue({
        firstName: this.editEmployee.firstName,
        lastName: this.editEmployee.lastName,
        email: this.editEmployee.email,
        jobTitle: this.editEmployee.jobTitle,
        office: this.editEmployee.office,
        department: this.editEmployee.department,
        phone: this.editEmployee.phoneNumber,
        skypeId: this.editEmployee.skypeId,
      });
    }
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;

    });
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
    if (this.mode === 'edit') {
      this.isEditEmployeeForm = true;
    } else {
      this.isAddEmployeeForm = true;
    }
  }

  onSubmit() {
    this.newEmployee.firstName = this.myForm.controls['firstName'].value;
    this.newEmployee.lastName = this.myForm.controls['lastName'].value;
    this.newEmployee.email = this.myForm.controls['email'].value;
    this.newEmployee.department = this.myForm.controls['department'].value;
    this.newEmployee.office = this.myForm.controls['office'].value;
    this.newEmployee.jobTitle = this.myForm.controls['jobTitle'].value;
    this.newEmployee.phoneNumber = this.myForm.controls['phone'].value;
    this.newEmployee.skypeId = this.myForm.controls['skypeId'].value;

    if (this.myForm.valid) {

      let departmentName = this.departmentService.getDepartmentById(this.newEmployee.department);
      this.departmentService.updateDepartmentCount(departmentName);

      let officeName = this.officeService.getOfficeById(this.newEmployee.office);
      this.officeService.updateOfficeCount(officeName);

      let jobTitleName = this.jobTitleService.getJobTitleById(this.newEmployee.jobTitle);
      this.jobTitleService.updateJobTitleCount(jobTitleName);
      this.isFormSubmit = true;
    }


    if (this.mode === 'add') {

      this.isEditEmployeeForm = false;
      let employeeList = (localStorage.getItem('employee'));
      let employeesList: Employee[] = [];

      if (employeeList) {
        employeesList = JSON.parse(employeeList);
      }
      employeesList.push(this.newEmployee);
      localStorage.setItem('employee', JSON.stringify(employeesList));
      this.submitModal();

    }

    if (this.mode === 'edit') {
      this.isAddEmployeeForm = false;

      let employeeList = localStorage.getItem('employee');
      let employeesList: Employee[] = [];

      if (employeeList) {
        employeesList = JSON.parse(employeeList);
      }

      let employeeIndex = employeesList.findIndex((employee) => employee.email === this.editEmployee?.email && employee.phoneNumber === this.editEmployee.phoneNumber);

      if (employeeIndex !== -1) {
        employeesList[employeeIndex] = this.newEmployee;
        localStorage.setItem('employee', JSON.stringify(employeesList));

      }
      // let departmentName = this.departmentService.getDepartmentById(this.editEmployee?.department);
      // this.departmentService.updateEditDepartmentCount(departmentName);

      // let officeName = this.officeService.getOfficeById(this.editEmployee?.office);
      // this.officeService.updateEditOfficeCount(officeName);

      // let jobTitleName = this.jobTitleService.getJobTitleById(this.editEmployee?.jobTitle);
      // this.jobTitleService.updateEditJobTitleCount(jobTitleName);
      // this.submitModal();
    }

    // 
    // }
    // if(this.isEditEmployeeForm){
    //   this.employeeEdited.emit();
    // }
  }
  submitModal() {
    if (this.isAddEmployeeForm) {
      this.isAddEmployeeForm = false;
      this.employeeAdded.emit();
    }
    if (this.isEditEmployeeForm) {
      this.isEditEmployeeForm = false;
      this.employeeEdited.emit();
    }
  }
  closeModal() {
    if (this.isAddEmployeeForm) {
      this.closeAddForm.emit();
    }
    else {
      this.closeEditForm.emit();
    }
  }
  // closeForm() {
  //   this.isFormCancel = true;
  //   this.myModal.emit();
  // }
}
