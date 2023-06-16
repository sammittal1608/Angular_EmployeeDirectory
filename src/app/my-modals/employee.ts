import { Department } from "./department"
import { JobTitle } from "./jobTitle"
import { Office } from "./office"


export class Employee {
    id?:string ;
    firstName ?: string;
    lastName ?:string;
    preferredName ?:string;
    emailAddress?: string;
    jobTitle ?:string;
    office ?:string;
    department ?: string;
    phoneNumber ?: string;
    skypeId ?:string;
    // [key: string]: any; 
    // constructor(args :any){
    //     this.id = uuidv4();
    //     this.firstName = args.firstName;
    //     this.lastName = args.lastName;
    //     this.prefferedName = this.firstName + this.lastName;
    //     this.email = args.email;
    //     this.jobTitle = args.jobTitle;
    //     this.office = args.office;
    //     this.department = args.depart;
    //     this.phoneNumber = args.phoneNumber;
    //     this.skypeId = args.skypeId;
    // }
}
