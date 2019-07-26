import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './components/student/student.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ],
  declarations: [StudentComponent, ModalComponent],
  entryComponents: [ ModalComponent]
})
export class StudentModule { }
