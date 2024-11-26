import { Routes } from '@angular/router';
import PagesLoginComponent from './pages/pages-login/pages-login.component';
import { InicioComponent } from './pages/pantalla-user/pages/inicio/inicio.component';
import { CrearProductoComponent } from './pages/pantalla-user/pages/crear-producto/crear-producto.component';
import { PlantillaMenu1Component } from './pages/pantalla-user/pages/plantilla-menu-1/plantilla-menu-1.component';
import { ListaDePlantillasMenuComponent } from './pages/pantalla-user/pages/lista-de-plantillas-menu/lista-de-plantillas-menu.component';
import { ListaProductosComponent } from './pages/pantalla-user/pages/lista-productos/lista-productos.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreateCategorieComponent } from './pages/pantalla-user/pages/categories/create-categorie/create-categorie.component';
import { AttributesComponent } from './modules/attributes/attributes.component';
import { ListAttributeComponent } from './modules/attributes/list-attribute/list-attribute.component';


export const routes: Routes = [
  {
    path:'register',
    component:PagesLoginComponent,
  },
  {
    path:'',
    redirectTo:'register',
    pathMatch:'full',
  },
  {
    path:'login',
    component:RegisterComponent,
  },
  {
    path:'usuario',
    component:InicioComponent,
    title:'usuario',
    children:[
      {
        path:'crear-producto',
        component:CrearProductoComponent,
      },
      {
        path:'lista-productos',
        component:ListaProductosComponent,
      },
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


    ]
  }
];
