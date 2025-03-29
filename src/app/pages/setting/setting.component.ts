import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting',
  imports: [FormsModule,CommonModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

  firstName : string = ""
  lastName : string = ""
  contact : string = ""
  address : string = ""
  role : string = ""
  gender : string = ""
  email : string = ""
  password : string = ""

  update(){

  }

}
