import { Component } from '@angular/core';
import { AttributesService } from '../service/attributes.service';
import { CreateAttributeComponent } from '../create-attribute/create-attribute.component';
import { EditAttributeComponent } from '../edit-attribute/edit-attribute.component';
import { SubAttributeCreateComponent } from '../sub-attribute-create/sub-attribute-create.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-attribute',
  standalone: true,
  imports: [CommonModule, RouterModule,  EditAttributeComponent, SubAttributeCreateComponent, CreateAttributeComponent],
  templateUrl: './list-attribute.component.html',
  styleUrls: ['./list-attribute.component.css']
})
export class ListAttributeComponent {
  attributes: any = [];
  search: string = '';
  totalPages: number = 0;
  currentPage: number = 1;
  isLoading$: any;

  showModal: boolean = false; // Para controlar la visibilidad del modal
  modalType: string = ''; // Tipo de modal (crear, editar, etc.)
  selectedAttribute: any = null; // Atributo seleccionado para editar o mostrar

  constructor(public attributesService: AttributesService) {}

  ngOnInit(): void {
    this.listAttributes();
    this.isLoading$ = this.attributesService.isLoading$;
  }

  listAttributes(page = 1) {
    this.attributesService.listAttributes(page,this.search).subscribe((resp: any) => {
      this.attributes = resp.attributes;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  getNameAttribute(type_attribute: any) {
    switch (parseInt(type_attribute)) {
      case 1: return 'Texto';
      case 2: return 'Número';
      case 3: return 'Seleccionable';
      case 4: return 'Seleccionable Múltiple';
      default: return '';
    }
  }

  searchTo() {
    this.listAttributes();
  }

  loadPage($event: any) {
    this.listAttributes($event);
  }

  // Método para abrir el modal de creación
  openModalCreateAttribute() {
    this.modalType = 'create';
    this.selectedAttribute = null; // Para asegurarse de que no haya un atributo seleccionado
    this.showModal = true;
  }

  // Método para abrir el modal de edición
  openModalEditAttribute(attribute: any) {
    this.modalType = 'edit';
    this.selectedAttribute = { ...attribute }; // Se pasa el atributo para editar
    this.showModal = true;
  }

  // Método para abrir el modal de eliminación
  deleteAttribute(attribute: any) {
    this.modalType = 'delete';
    this.selectedAttribute = { ...attribute }; // Se pasa el atributo para eliminar
    this.showModal = true;
  }

  // Método para abrir el modal de registro de propiedades
  openModalRegisterProperties(attribute: any) {
    this.modalType = 'properties';
    this.selectedAttribute = { ...attribute };
    this.showModal = true;
  }

  // Método para manejar la creación de un atributo
  handleCreate(newAttribute: any) {
    console.log('Atributo recibido en el componente padre:', newAttribute);
    if (newAttribute) {
      this.attributes.unshift(newAttribute);
      this.listAttributes(this.currentPage); // Refresca la lista desde el servidor
      this.closeModal();
    }
  }

  // Método para manejar la edición de un atributo
  handleEdit(updatedAttribute: any) {
    const index = this.attributes.findIndex((item: any) => item.id === updatedAttribute.id);
    if (index !== -1) {
      this.attributes[index] = updatedAttribute;
    }
    this.closeModal();
  }

  // Método para manejar la eliminación de un atributo
  handleDelete(attributeId: number) {
    const index = this.attributes.findIndex((item: any) => item.id === attributeId);
    if (index !== -1) {
      this.attributes.splice(index, 1);
    }
    this.closeModal();
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
    this.modalType = '';
    this.selectedAttribute = null;
  }
}
