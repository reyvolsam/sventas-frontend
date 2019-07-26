import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Grade } from 'src/app/models/Grade';
import { ParentTypes } from 'src/app/models/ParentTypes';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData;

  studentForm: FormGroup
  student_submitted:Boolean = false
  loader:Boolean = false
  catalogs_loader:Boolean = false
  
  grade_list:Grade
  parent_type:ParentTypes

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.studentForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      enrollment: ['', [Validators.required]],
      grade_id: ['', [Validators.required]],
      loader: []
    })
   }

  ngOnInit() {
    this.studentForm.setValue(this.formData)
  }

}
