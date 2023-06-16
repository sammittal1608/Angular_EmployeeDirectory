import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../../my-modals/employee';
import { DepartmentService } from '../../my-services/department.service';
import { OfficeService } from '../../my-services/office.service';
import { JobTitleService } from '../../my-services/job-title.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  departmentService: DepartmentService;
  officeService: OfficeService;
  jobTitleService: JobTitleService;
  constructor(departmentService: DepartmentService, officeService: OfficeService, jobTitleService: JobTitleService) {
    this.departmentService = departmentService;
    this.officeService = officeService;
    this.jobTitleService = jobTitleService;
  }

  @Input() employee!: Employee;
  @Output() cardClick: EventEmitter<Employee> = new EventEmitter<Employee>();
  department: any;
  jobTitle: any ;
  office: any ;

  ngOnInit(): void {
    
   this.getDepartment();
   this.getJobTitle();
   this.getOffice();
  }
   
getDepartment(){
  this.department = this.departmentService.getDepartmentById(this.employee.department).subscribe(data =>{
    this.department = data;
  });
}
getJobTitle(){
  this.jobTitle = this.jobTitleService.getJobTitleById(this.employee.jobTitle).subscribe(data =>{
    this.jobTitle =data;
  });
}
getOffice(){
  this.office=this.officeService.getOfficeById(this.employee.office).subscribe(data =>{
    this.office = data;
  });
}
  handleClick(){
    this.cardClick.emit(this.employee); 
  }
  //  icons: string[] = ["telephone", "envelope", "chat", "star", "heart"];
}

