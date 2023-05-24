import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
constructor(){
}


departments: Map<string, number> = new Map<string, number>([
  ['IT', 0],
  ['Human Resources', 0],
  ['MD', 0],
  ['Sales', 0]
]);

offices : Map<string,number> = new Map<string,number> ([
  ['Seattle', 0],
  ['India', 0]
]);

jobTitles: Map<string,number> = new Map<string,number> ([
  ['Sharepoint Practice Head', 0],
  ['.Net Development Lead', 0],
  ['Recruiting Expert', 0],
  ['BI Developer', 0],
  ['Business Analyst', 0]
]);


 //  let departmentHTML = `
 //  <li class="filter-title" id="sideBarDepartment">Departments</li>
 //  `;

 //  for (const dept in departments) {
 //    departmentHTML += `
 //    <li><a href="#" onclick="Departmentfilter('${dept}')" data-set-dep id="depart-${dept}">${dept}( <span>${departments[dept]}</span> )</a></li>
 //    `;
 //  }

 //  sideBarDepartmentContainer.innerHTML = departmentHTML;


 //  let officeHTML = `
 //  <li class="filter-title" id="sideBarOffice">Offices</li>
 //  `;

 //  for (const off in offices) {
 //    officeHTML += `
 //    <li><a href="#" onclick="OfficeFilter('${off}')" data-set-off id="office-${off}">${off}( <span>${offices[off]}</span> )</a></li>
 //    `;
 //  }

 //  sideBarOfficeContainer.innerHTML = officeHTML;

 //  let jobTitleHTML = `
 //  <li class="filter-title" id="sideBarJobTitle">Job title</li>
 //  `;

 //  for (const title in jobTitles) {
 //    jobTitleHTML += `
 //      <li><a href="#" onclick="JobTitlefilter('${title}')" data-set-jobTitle id="jobTitle-${title}">${title}( <span>${jobTitles[title]}</span> )</a></li>
 //      `;
 //  }

 //  jobTitleHTML += `
 //    <li><a href="#" style="color: dodgerblue;" onclick="viewElement()" id="view-btn-block">view more</a></li>
 //  `;

 //  sideBarJobTitleContainer.innerHTML = jobTitleHTML;
}


