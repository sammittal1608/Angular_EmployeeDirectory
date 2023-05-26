import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './my-component/home/home.component';
import { HeaderComponent } from './my-component/header/header.component';
import { SidebarComponent } from './my-component/sidebar/sidebar.component';
import { SearchbarComponent } from './my-component/searchbar/searchbar.component';
import { EmployeeCardComponent } from './my-component/employee-card/employee-card.component';
import { EmployeeFormComponent} from './my-component/employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeCardContainerComponent } from './my-component/employee-card-container/employee-card-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FilterObject } from './my-modals/filter-object';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    SearchbarComponent,
    EmployeeCardComponent,
    EmployeeFormComponent,
    EmployeeCardContainerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  FormsModule
  ],
  providers: [FilterObject],
  bootstrap: [AppComponent]

})
export class AppModule { }
