import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { AttributesService } from '../service/attributes.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Module from 'module';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-attribute',
  standalone: true,
  imports: [CommonModule,RouterModule,  FormsModule],
  templateUrl: './create-attribute.component.html',
  styleUrl: './create-attribute.component.css'
})
export class CreateAttributeComponent {

  @Output() AttributeC: EventEmitter<any> = new EventEmitter();

  name: string = '';
  type_attribute: number = 1;
  isLoading$:any;


  constructor(public attributeService: AttributesService, ){}



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isLoading$ = this.attributeService.isLoading$;
  }

  dismiss(){}
  store(){
    let data = {
      name :this.name,
      type_attribute: this.type_attribute,
      state:1,
    }
    this.attributeService.createAttributes(data).subscribe((resp:any) =>{
       this.AttributeC.emit(resp.attribute);
    })
  }
}
