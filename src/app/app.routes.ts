import { Routes } from '@angular/router';
import { InicioComponent } from './pages/pantalla-user/pages/inicio/inicio.component';
import { PlantillaMenu1Component } from './modules/plantillas menu/plantilla-menu-1/plantilla-menu-1.component';
import { ListaDePlantillasMenuComponent } from './modules/plantillas menu/lista-de-plantillas-menu/lista-de-plantillas-menu.component';
import { AttributesComponent } from './modules/attributes/attributes.component';
import { ListAttributeComponent } from './modules/attributes/list-attribute/list-attribute.component';
import { CreateCategorieComponent } from './modules/categories/create-categorie/create-categorie.component';
import { ProfileUserComponent } from './modules/profile-user/profile-user.component';
import { PlantillaMenu3Component } from './modules/plantillas menu/plantilla-menu-3/plantilla-menu-3.component';



export const routes: Routes = [
  {
    path:'registro',
    loadComponent: () => import('./pages/pages-login/pages-login.component').then((m) => m.PagesLoginComponent)
  },
  {
    path:'',
    redirectTo:'registro',
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
        path:'mi-perfil',
        component:ProfileUserComponent
      },
      {
        path:'crear-categorias',
        component:CreateCategorieComponent,
      },
      {
        path:'lista-plantillas',
        component:ListaDePlantillasMenuComponent,
        children:[

          {
            path:'demo-1',
            loadComponent: () => import('./modules/plantillas menu/plantilla-menu-1/plantilla-menu-1.component').then((m) => m.PlantillaMenu1Component)
          },
          {
            path:'demo-3',
            loadComponent: () => import('./modules/plantillas menu/plantilla-menu-3/plantilla-menu-3.component').then((m) => m.PlantillaMenu3Component)
          },
          {
            path:'demo-4',
            loadComponent: () => import('./modules/plantillas menu/plantilla-menu-4/plantilla-menu-4.component').then((m) => m.PlantillaMenu4Component)
          },
          {
            path:'demo-5',
            loadComponent: () => import('./modules/plantillas menu/plantilla-menu-5/plantilla-menu-5.component').then((m) => m.PlantillaMenu5Component)
          },
          {
            path:'demo-6',
            loadComponent: () => import('./modules/plantillas menu/plantilla-menu-6/plantilla-menu-6.component').then((m) => m.PlantillaMenu6Component)
          },
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
        path:'producto/edit/:id',
        loadComponent: () => import('./modules/products/edit-product/edit-product.component').then((m) => m.EditProductComponent)
      },
      {
        path:'subir-masivo',
        loadComponent: () => import('./modules/carga-productos-csv/import-max/import-max.component').then((m) => m.ImportMaxComponent)
      },

    ]
  }
];
