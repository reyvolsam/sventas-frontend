import { Component, OnInit } from '@angular/core'
import { SchoolGroup } from 'src/app/models/SchoolGroup'
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'
import { SchoolGroupService } from 'src/app/services/school_group/school-group.service'
import { ModalComponent } from '../modal/modal.component'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-school-group',
  templateUrl: './school-group.component.html',
  styleUrls: ['./school-group.component.css']
})
export class SchoolGroupComponent implements OnInit {

  school_groups_list:SchoolGroup[] = []
  school_group_loader:Boolean = false

  school_group:SchoolGroup = {
    id: null,
    name: '',
    description: '',
    grade_id:null,
    grade: '',
    loader: false
  }

  constructor(
    private schoolGroupService:SchoolGroupService,
    private modalService: NgbModal,
    modal_config: NgbModalConfig
  ) {
    modal_config.backdrop = 'static'
    modal_config.keyboard = false
   }

  ngOnInit() {
    this.getSchoolGroupsList()
  }

  getSchoolGroupsList()
  {
    this.school_groups_list = []
    this.school_group_loader = true

    this.schoolGroupService.getSchoolGroups()
    .subscribe(
      res => {
        console.log(res)
        this.school_group_loader = false
        this.school_groups_list = res.data
        if(this.school_groups_list.length == 0){
          Swal.fire('¡Atención!', res.message, 'warning')
        }
      },
      error => {
        console.log(error.error.message)
        this.school_group_loader = false
        Swal.fire('¡Error!', error.error.message, 'warning')
      })
  }//gerUsersList()}

  open()
  {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.formData = this.school_group
    modalRef.result.then(result => result ? this.getSchoolGroupsList() : false)
  }//open()
  
  edit(i)
  {
    const modalRef = this.modalService.open(ModalComponent)
    modalRef.componentInstance.formData = this.school_groups_list[i]
    modalRef.result.then(result => result ? this.getSchoolGroupsList() : false)
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
        this.school_groups_list[i].loader = true
        this.schoolGroupService.deleteSchoolGroup(this.school_groups_list[i].id)
        .subscribe(
          res => {
            console.log(res)
            this.school_groups_list[i].loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.getSchoolGroupsList()
          },
          error => {
            console.log(error.error.message)
            this.school_groups_list[i].loader = false
            Swal.fire('¡Error!', error.error.message, 'warning')
          })
      } else {
        Swal.fire('', 'Usuario no eliminado', 'warning')
      }
    })
  }//delete()

}////
