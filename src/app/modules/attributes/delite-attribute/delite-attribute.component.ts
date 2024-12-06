import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../products/service/product.service';

@Component({
  selector: 'app-delite-attribute',
  standalone: true,
  imports: [],
  templateUrl: './delite-attribute.component.html',
  styleUrl: './delite-attribute.component.css'
})
export class DeleteAttributeComponent {
  @Input() product:any;

  @Output() ProductD: EventEmitter<any> = new EventEmitter();
  isLoading:any;
  constructor(
    public productService: ProductService,
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isLoading = this.productService.isLoading$;
  }
  delete(){
    this.productService.deleteProduct(this.product.id).subscribe((resp:any) => {
      this.ProductD.emit({message: 200});
    })
  }
}
