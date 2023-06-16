export class JobTitle {

    id: string;
    name: string;
    count: number;

    constructor(args: any) {

        this.id = args.id;
        this.name = args.name;
        this.count = args.count
    }
}