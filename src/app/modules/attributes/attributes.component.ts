import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from 'express';
import { routes } from './attributes-routing.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-attributes',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './attributes.component.html',
  styleUrl: './attributes.component.css'
})
export class AttributesComponent {

}
