import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-employee-form-component',
  templateUrl: './employee-form-component.component.html',
  styleUrls: ['./employee-form-component.component.css']
})
export class EmployeeFormComponent implements OnInit {
  myForm: FormGroup;
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    office: '',
    department: '',
    phoneNumber: '',
    skypeId: ''
  };

  constructor(public empService: EmployeeService) {
    this.myForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      jobTitle: new FormControl('', [Validators.required, Validators.email]),
      office: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      skypeId: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    this.empService.currentEmployee.subscribe(employee => {
      if (employee) {
        this.employee = employee;
        this.myForm.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          jobTitle: employee.jobTitle,
          office: employee.office,
          department: employee.department,
          phone: employee.phone,
          skypeId: employee.skypeId,
        });
      }
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
}
