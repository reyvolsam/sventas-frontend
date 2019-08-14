import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Grade } from 'src/app/models/Grade'
import { ParentTypes } from 'src/app/models/ParentTypes'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { SchoolGroup } from 'src/app/models/SchoolGroup'

import { GradeService } from '../../../../services/grade/grade.service'
import Swal from 'sweetalert2'

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
  
  grade_loader:Boolean = false
  grades_list:Grade[] = []
  
  school_group_loader:Boolean = false
  school_groups_list:SchoolGroup[] = []

  constructor(
    private gradeService: GradeService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.studentForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      enrollment: ['', [Validators.required]],
      grade_id: ['', [Validators.required]],
      school_group_id: ['', [Validators.required]],
      loader: []
    })

    this.getGradesList()
   }//

   get c(){ return this.studentForm.controls }

  ngOnInit() {
    this.studentForm.setValue(this.formData)
  }

  getGradesList()
  {
    this.grade_loader = true
    this.gradeService.getGrades()
    .subscribe(
      res => {
        this.grade_loader = false
        this.grades_list = res.data
        this.grades_list.unshift({id: null, name: 'Seleccione una opción...', description: '', campus_id: null})
      },
      error => {
        this.grade_loader = false
        Swal.fire('¡Error!', error.error.message, 'error')
      })
  }//getGradesList()

  onGradeChange(e)
  {
    console.log(this.studentForm.controls.grade_id.value)
  }//onShoolGroupChange()

}
