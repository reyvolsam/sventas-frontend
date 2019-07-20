import { Component, OnInit } from '@angular/core';
import { Grade } from 'src/app/models/Grade';
import { GradeService } from 'src/app/services/grade/grade.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../../grade/components/modal/modal.component';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  grades_list:Grade[] = []
  grade_loader:Boolean = false

  grade:Grade = {
    id: null,
    name: '',
    description: '',
    campus_id:null,
    campus: '',
    loader: false
  }

  constructor(
    private userService:GradeService,
    private modalService: NgbModal,
    modal_config: NgbModalConfig
  ) { 
    modal_config.backdrop = 'static'
    modal_config.keyboard = false
  }

  ngOnInit() {
    this.getGradesList()
  }

  getGradesList()
  {
    this.grades_list = []
    this.grade_loader = true

    this.userService.getGrades()
    .subscribe(
      res => {
        console.log(res)
        this.grade_loader = false
        this.grades_list = res.data
        if(this.grades_list.length == 0){
          Swal.fire('¡Atención!', res.message, 'warning')
        }
      },
      error => {
        console.log(error.error.message)
        this.grade_loader = false
        Swal.fire('¡Error!', error.error.message, 'warning')
      })
  }//gerUsersList()}

  open()
  {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.formData = this.grade
    modalRef.result.then(result => result ? this.getGradesList() : false)
  }//open()
  
  edit(i)
  {
    const modalRef = this.modalService.open(ModalComponent)
    modalRef.componentInstance.formData = this.grades_list[i]
    modalRef.result.then(result => result ? this.getGradesList() : false)
  }//edit()

  delete(i)
  {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar este grado?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.grades_list[i].loader = true
        this.userService.deleteGrade(this.grades_list[i].id)
        .subscribe(
          res => {
            console.log(res)
            this.grades_list[i].loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.gerGradesList()
          },
          error => {
            console.log(error.error.message)
            this.grades_list[i].loader = false
            Swal.fire('¡Error!', error.error.message, 'warning')
          })
      } else {
        Swal.fire('', 'Usuario no eliminado', 'warning')
      }
    })
  }//delete()

}////
