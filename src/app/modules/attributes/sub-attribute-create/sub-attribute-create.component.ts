import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributesService } from '../service/attributes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-attribute-create',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './sub-attribute-create.component.html',
  styleUrl: './sub-attribute-create.component.css'
})
export class SubAttributeCreateComponent implements OnInit {
  @Output() AttributeC: EventEmitter<any> = new EventEmitter();
  @Input() attribute:any;
  properties:any = [];
  isLoading$:any;

  color:any;
  type_action:number = 1;
  name:string = '';


  constructor(public attributeService: AttributesService, ){}



  ngOnInit(): void {
    this.isLoading$ = this.attributeService.isLoading$;
    this.properties = this.attribute.properties;
  }


  store(){
    let data = {
      name: this.name,
      code: this.color,
      state:1,
      attribute_id: this.attribute.id,
    };
    this.attributeService.createProperties(data).subscribe((resp:any) => {
      this.properties.unshift(resp.propertie);
    })

  }

  delete(propertie:any){}
}
