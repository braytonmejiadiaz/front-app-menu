import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AttributesService } from '../service/attributes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-attribute',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-attribute.component.html',
  styleUrl: './edit-attribute.component.css'
})
export class EditAttributeComponent {
  @Input() attribute: any;
  @Output() attributeUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private attributeService: AttributesService) {}

  update() {
    const updatedData = {
      name: this.attribute.name,
      type_attribute: this.attribute.type_attribute,
    };

    this.attributeService.updateAttributes(this.attribute.id, updatedData).subscribe({
      next: (resp: any) => {
        console.log('Atributo actualizado:', resp);
        this.attributeUpdated.emit(resp.attribute); // Notifica al padre
      },
      error: (err) => {
        console.error('Error al actualizar el atributo:', err);
      },
    });
  }
}
