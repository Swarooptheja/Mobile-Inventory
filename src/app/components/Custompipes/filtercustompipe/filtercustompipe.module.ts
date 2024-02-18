import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltercustompipePipe } from '../filtercustompipe.pipe';



@NgModule({
  declarations: [
    FiltercustompipePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FiltercustompipePipe
  ]
})
export class FiltercustompipeModule { }
