import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Istd } from '../../models/std';

@Component({
  selector: 'app-std-table',
  templateUrl: './std-table.component.html',
  styleUrls: ['./std-table.component.scss']
})
export class StdTableComponent implements OnInit {
  @Input() getstdArr!: Array<Istd>;
  @Output() EditObj: EventEmitter<Istd> = new EventEmitter<Istd>();
  constructor() { }
  ngOnInit(): void {
  }

  onRemove(std:Istd){
  let confirmed = confirm('do you want to remove Student.');
  if(confirmed){
    let removeId = this.getstdArr.findIndex(
      (stdObj)=> stdObj.stdId === std.stdId
    );
    this.getstdArr.splice(removeId, 1);
    localStorage.setItem('stdArr', JSON.stringify(this.getstdArr))
  }
  }

  onEdit(std : Istd){
    this.EditObj.emit(std)
  }

}
