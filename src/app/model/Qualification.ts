export class Qualification{

  id : number;
  name: string;
  institution: string;
  yearObtained: number;

  constructor(id : number , name: string , institution: string , yearObtained: number){
    this.id = id;
    this.name = name;
    this.institution = institution;
    this.yearObtained = yearObtained;
  }
}
