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
  jobTitle: any = {};
  office: any = {};

  ngOnInit(): void {
    // this.department = this.departmentService.GetDepartmentById(this.employee.department);
    // if (this.department == null) {
    //   this.department = new Department({ id: 0, name: '', count: 0 });
    // }
    // this.jobTitle = this.jobTitleService.GetJobTitleById(this.employee.jobTitle);
    // this.office=this.officeService.GetOfficeById(this.employee.office);
  }

  getDepartmentName(): string{
    let department = this.departmentService.getDepartmentById(this.employee.department);
    if(department){
      return department.name;
    }
    return "";
  }
  getOfficeName(): string{
    let office = this.officeService.getOfficeById(this.employee.office);
    if(office){
      return office.name;
    }
    return "";
  }
  getJobTitleName(): string{
    let jobTitle = this.jobTitleService.getJobTitleById(this.employee.jobTitle);
    if(jobTitle){
      return jobTitle.name;
    }
    return "";
  }
  handleClick(){
    this.cardClick.emit(this.employee); 
  }
   icons: string[] = ["telephone", "envelope", "chat", "star", "heart"];
}

