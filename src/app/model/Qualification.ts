export class Qualification{

  name: string;
  institution: string;
  yearObtained: number;

  constructor(id : number , name: string , institution: string , yearObtained: number){
    this.name = name;
    this.institution = institution;
    this.yearObtained = yearObtained;
  }
}
