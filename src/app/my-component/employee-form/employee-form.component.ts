import { Component, EventEmitter, Input, NgModuleFactory, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../my-modals/employee';
import { EmployeeService } from '../../my-services/employee.service';
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
  
  
  @Input() employee ?: Employee;
  @Output() closeForm: EventEmitter<any> = new EventEmitter();
  @ViewChild('myModal') myModal: any;

  modalRef?: BsModalRef;
  employees: Employee[] = [];
  newEmployee: Employee = new Employee();
  
  myForm: FormGroup;
  departments: Department[] = this.departmentService.getDepartmentList();
  offices: Office[] = this.officeService.getOfficeList();
  jobTitles: JobTitle[] = this.jobTitleService.getJobTitleList();

  constructor( private employeeService: EmployeeService, private departmentService: DepartmentService, private officeService: OfficeService, private jobTitleService: JobTitleService) {
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

  ngOnInit() {
    if (this.employee) {
      this.myForm.patchValue({
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        email: this.employee.emailAddress,
        jobTitle: this.employee.jobTitle,
        office: this.employee.office,
        department: this.employee.department,
        phone: this.employee.phoneNumber,
        skypeId: this.employee.skypeId,
      });
    }
    this.employeeService.getEmployees().subscribe(data => {
      this.employees= data;

    }, error => {
      
    });
    // this.departmentService.getDepartmentList().subscribe(
    //   (departments: Department[]) => {
    //     this.departments = departments;
    //   }, error => {
      
    //   });
    // this.officeService.getOfficeList().subscribe(
    //   (offices: Office[]) => {
    //     this.offices = offices;
    //   }, error => {
      
    //   });
    // this.jobTitleService.getJobTitleList().subscribe(
    //   (jobTitles: JobTitle[]) => {
    //     this.jobTitles = jobTitles;
    //   }, error => {
      
    //   });
  }
  onSubmit() {
    this.newEmployee.firstName = this.myForm.controls['firstName'].value;
    this.newEmployee.lastName = this.myForm.controls['lastName'].value;
    this.newEmployee.emailAddress = this.myForm.controls['email'].value;
    this.newEmployee.department = this.myForm.controls['department'].value;
    this.newEmployee.office = this.myForm.controls['office'].value;
    this.newEmployee.jobTitle = this.myForm.controls['jobTitle'].value;
    this.newEmployee.phoneNumber = this.myForm.controls['phone'].value;
    this.newEmployee.skypeId = this.myForm.controls['skypeId'].value;
    this.newEmployee.preferredName = this.newEmployee.firstName + '' + this.newEmployee.lastName;
    this.newEmployee.id = '';
    if(this.employee){
      this.newEmployee.id = this.employee.id;
    }
    
    if (this.myForm.valid) {
      if (this.newEmployee.id == '') {
        this.employeeService.addEmployee(this.newEmployee).subscribe(data => {
          console.log(data);
        }, error => {
  
        });
      } else {
        this.employeeService.updateEmployee(this.newEmployee).subscribe(data => {
          console.log(data);
        },
          error =>{
        });
      }
      this.closeModal();
    }
  }
  closeModal() {
    this.closeForm.emit();
  }
}
