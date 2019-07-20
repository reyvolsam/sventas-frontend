import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Campus } from 'src/app/models/Campus';
import { CampusService } from 'src/app/services/campus/campus.service';
import { GradeService } from 'src/app/services/grade/grade.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData;

  gradeForm: FormGroup
  grade_submitted:Boolean = false
  loader:Boolean = false
  campus_loader:Boolean = false

  campus_list:Campus[] = []
  campus:Campus

  constructor(
    private campusService: CampusService,
    private userService: GradeService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.gradeForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      campus_id: [null, [Validators.required]],
      campus: [],
      loader: []
    })
    this.getCampusList()
   }//

  ngOnInit() {
    this.gradeForm.setValue(this.formData)
  }//

  get c(){ return this.gradeForm.controls }

  getCampusList()
  {
    this.campus_loader = true
    this.campusService.getCampus()
    .subscribe(
      (res) => {
        this.campus_loader = false
        this.campus_list = res.data
        this.campus = {id: null, name:'Seleccione una opción...', description:''}
        this.campus_list.unshift(this.campus)
      },
      error => {
        this.campus_loader = false
        Swal.fire('¡Error!', error.error.message, 'error')
      })
  }//getCampusList()

  onSubmit()
  {
    this.grade_submitted = true
    if (this.gradeForm.invalid) {
      return;
    } else {
      this.loader = true
      if(this.gradeForm.value.id === null){
        this.userService
        .saveGrade(this.gradeForm.value)
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
        this.userService
        .updateGrade(this.gradeForm.value)
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
