import { Department } from "./department"
import { JobTitle } from "./jobTitle"
import { Office } from "./office"

export class Employee {
    [x: string]: any
    firstName !: string
    lastName !:string
    email!: string
    jobTitle !:JobTitle
    office !:Office
    department !: Department;
    phoneNumber !: string;
    skypeId !:string;
    // constructor(args :any){
    //     this.firstName = args.firstName;
    //     this.lastName = args.lastName;
    //     this.email = args.email;
    //     this.jobTitle = args.jobTitle;
    //     this.office = args.office;
    //     this.department = args.depart;
    //     this.phoneNumber = args.phoneNumber;
    //     this.skypeId = args.skypeId;
    // }
}
