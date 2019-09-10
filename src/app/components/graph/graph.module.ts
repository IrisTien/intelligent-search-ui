import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  exports: [
    GraphComponent
  ]
})
export class GraphModule { }
