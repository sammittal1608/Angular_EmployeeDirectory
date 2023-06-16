import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Employee } from '../../my-modals/employee';
import { EmployeeService } from 'src/app/my-services/employee.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
 
  @Output() paginationClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchFilterClick: EventEmitter<any> = new EventEmitter<any>();
  searchTerm: string = "";
  searchType: string = "";

  showModule = false;
  modalRef?: BsModalRef;
  employeeService ?: EmployeeService;
  
  @ViewChild('template') AddModal!: TemplateRef<any>;

  constructor(private modalService: BsModalService ,employeeService : EmployeeService) {
    this.employeeService = employeeService;
    this.searchType = 'preferredName';
   }

  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  isEmployeeAdd: boolean = false;
  // isButtonClick: Boolean = false;
  activeButton: string | null = null;
  employee?: Employee;
  clickedChar?: string = '';

  openModal(): void {
    this.isEmployeeAdd = true;
    this.showModule = true;
    this.ShowModal();
  }

  ShowModal() {
    this.modalRef = this.modalService.show(this.AddModal);
  }

  closeModal(): void {
    this.isEmployeeAdd = false;
    this.showModule = false;
  }

  handleButtonClick(char: string) {
    if (this.activeButton === char) {
      this.activeButton = null;
    } else {
      this.activeButton = char;
    }
    this.paginationClick.emit(this.activeButton || '');
  }
  
  searchFilter() {
    this.searchFilterClick.emit([this.searchTerm, this.searchType]);
  }

  clearSearch() {
    this.searchTerm = "";
    this.searchType = "preferredName";
    this.searchFilterClick.emit([this.searchTerm, this.searchType]);
  }

  closeForm(){
    this.modalService?.hide();
  }
}
