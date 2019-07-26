import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolGroupRoutingModule } from './school-group-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolGroupComponent } from './components/school-group/school-group.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SchoolGroupRoutingModule
  ],
  declarations: [SchoolGroupComponent, ModalComponent],
  entryComponents: [ModalComponent]
})
export class SchoolGroupModule { }
