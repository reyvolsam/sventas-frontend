import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampusRoutingModule } from './campus-routing.module';
import { CampusComponent } from './components/campus/campus.component';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CampusRoutingModule
  ],
  declarations: [CampusComponent, ModalComponent],
  entryComponents: [ ModalComponent]
})
export class CampusModule { }
