import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph.component';
import { ClarityModule } from '@clr/angular';



@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    ClarityModule
  ],
  exports: [
    GraphComponent
  ]
})
export class GraphModule { }
