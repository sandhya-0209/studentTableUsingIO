import { Component, OnInit, ViewChild } from '@angular/core';
import { Istd } from '../../models/std';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {
  stdArr : Array<Istd> = [
    // {
    //   fname : 'sandhya',
    //   lname : 'kulkarni',
    //   email : 'sandhya2@gmail.com',
    //   contact : '7289820932',
    //   stdId : '1'
    // }
  ]
  constructor() { }
  generateUuid() {
    return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
      /[xy]/g,
      (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === 'x' ? random : (random & 0x3) | 0x8;
        return value.toString(16);
      }
    );
  };

  @ViewChild('stdForm') stdForm !: NgForm;
  isHide!: boolean
  onSubmit(){
     if(this.stdForm.valid){
      let newObj = {...this.stdForm.value, stdId : this.generateUuid()}
      this.stdForm.resetForm();
      this.stdArr.unshift(newObj);
      localStorage.setItem('stdArr', JSON.stringify(this.stdArr))
     }
  }

  ngOnInit(): void {
    let getArr = localStorage.getItem('stdArr');
    if(getArr){
      this.stdArr = JSON.parse(getArr);
    }
  }
 
  onEdit(event : Istd){
    if(event){
      this.stdForm.form.patchValue(event);
      localStorage.setItem('editId', event.stdId)
      this.isHide = true
    }
  }

  onUpdate(){
    let newUpdatedObj ={
      ...this.stdForm.value,
      stdId: localStorage.getItem('editId')
    }
    let getUpdatedIndex = this.stdArr.findIndex(
      (updatedId) => updatedId.stdId === newUpdatedObj.stdId
    );
    this.stdArr[getUpdatedIndex] =newUpdatedObj;
    localStorage.setItem('stdArr', JSON.stringify(this.stdArr));
    this.stdForm.resetForm();
    this.isHide = false;
  }

}
