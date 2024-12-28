import { Routes } from '@angular/router';
import { InicioComponent } from './pages/pantalla-user/pages/inicio/inicio.component';
import { PlantillaMenu1Component } from './pages/pantalla-user/pages/plantilla-menu-1/plantilla-menu-1.component';
import { ListaDePlantillasMenuComponent } from './pages/pantalla-user/pages/lista-de-plantillas-menu/lista-de-plantillas-menu.component';
import { AttributesComponent } from './modules/attributes/attributes.component';
import { ListAttributeComponent } from './modules/attributes/list-attribute/list-attribute.component';
import { CreateCategorieComponent } from './modules/categories/create-categorie/create-categorie.component';


export const routes: Routes = [
  {
    path:'register',
    loadComponent: () => import('./pages/pages-login/pages-login.component').then((m) => m.PagesLoginComponent)
  },
  {
    path:'',
    redirectTo:'register',
    pathMatch:'full',
  },
  {
    path:'login',
    loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent)
  },
  {
    path:'usuario',
    component:InicioComponent,
    title:'usuario',
    children:[
      {
        path:'crear-categorias',
        component:CreateCategorieComponent,
      },
      {
        path:'atributos',
        component:AttributesComponent,
        children:[
          {
            path:'list',
            component:ListAttributeComponent,
          }
        ]
      },
      {
        path:'lista-plantillas',
        component:ListaDePlantillasMenuComponent,
        children:[
          {
            path:'demo-1',
            component:PlantillaMenu1Component,
            pathMatch:'full'
          }
        ]
      },
      {
        path:'crear-producto',
        loadComponent: () => import('./modules/products/create-product/create-product.component').then((m) => m.CreateProductComponent)
      },
      {
        path:'lista-producto',
        loadComponent: () => import('./modules/products/list-product/list-product.component').then((m) => m.ListProductComponent)
      },
      {
        path:'list/edit/:id',
        loadComponent: () => import('./modules/products/edit-product/edit-product.component').then((m) => m.EditProductComponent)
      },
      {
        path:'subir-masivo',
        loadComponent: () => import('./modules/carga-productos-csv/import-max/import-max.component').then((m) => m.ImportMaxComponent)
      },

    ]
  }
];
