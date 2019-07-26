import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SchoolGroup } from 'src/app/models/SchoolGroup';
import { SchoolGroupService } from 'src/app/services/school_group/school-group.service';
import { GradeService } from 'src/app/services/grade/grade.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Grade } from 'src/app/models/Grade';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData;

  schoolGroupForm: FormGroup
  school_group_submitted:Boolean = false
  loader:Boolean = false
  grade_loader:Boolean = false

  grade_list:Grade[] = []
  grade:Grade
  
  constructor(
    private schoolGroupService: SchoolGroupService,
    private gradeService: GradeService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { 
    this.schoolGroupForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      grade_id: [null, [Validators.required]],
      grade: [],
      loader: []
    })
    this.getGradeList()
  }

  ngOnInit() {
    console.log('this.formData', this.formData)
    this.schoolGroupForm.setValue(this.formData)
  }//

  get c(){ return this.schoolGroupForm.controls }

  getGradeList()
  {
    this.grade_loader = true
    this.gradeService.getGrades()
    .subscribe(
      (res) => {
        this.grade_loader = false
        this.grade_list = res.data
        this.grade = {id: null, name:'Seleccione una opción...', description:'', campus_id: null}
        this.grade_list.unshift(this.grade)
      },
      error => {
        this.grade_loader = false
        Swal.fire('¡Error!', error.error.message, 'error')
      })
  }//getCampusList()

  onSubmit()
  {
    this.school_group_submitted = true
    if (this.schoolGroupForm.invalid) {
      return;
    } else {
      this.loader = true
      if(this.schoolGroupForm.value.id === null){
        this.schoolGroupService
        .saveSchoolGroup(this.schoolGroupForm.value)
        .subscribe(
          (res) => {
            console.log(res)
            this.loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.activeModal.close(true)
          },
          error => {
            this.loader = false
            Swal.fire('¡Error!', error.error.message, 'error')
          })
      } else {
        this.schoolGroupService
        .updateSchoolGroup(this.schoolGroupForm.value)
        .subscribe(
          (res) => {
            console.log(res)
            this.loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.activeModal.close(true)
          },
          error => {
            this.loader = false
            Swal.fire('¡Error!', error.error.message, 'error')
          })
      }
    }
  }//CreateCampus()

  Close()
  {
    this.activeModal.close(false)
  }//Close()

}////
