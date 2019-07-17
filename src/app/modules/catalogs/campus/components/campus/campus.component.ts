import { Component, OnInit } from '@angular/core';
import { Campus } from 'src/app/models/Campus';
import { CampusService } from 'src/app/services/campus/campus.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  campus_list: Campus[] = []
  campus_list_loader:Boolean = false

  campus:Campus = {
    id:null,
    name:'',
    description:'',
    loader: false
  }
  create_campus_loader:Boolean = false
  
  constructor(
    private campusService:CampusService,
    private modalService: NgbModal,
    modalConfig: NgbModalConfig
    ){
      modalConfig.backdrop = 'static'
      modalConfig.keyboard = false
    }

  ngOnInit() {
    this.getCampusList()
  }//

  getCampusList()
  {
    this.campus_list = []
    this.campus_list_loader = true
    this.campusService.getCampus()
      .subscribe(
        res => {
          console.log(res)
          this.campus_list_loader = false
          this.campus_list = res.data
          if(this.campus_list.length == 0){
            Swal.fire('¡Atención!', res.message, 'warning')
          }
        },
        error => {
          console.log(error.error.message)
          this.campus_list_loader = false
          Swal.fire('¡Error!', error.error.message, 'warning')
        })
  }//getCampusList()

  open()
  {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.formData = this.campus
    modalRef.result.then(result => result ? this.getCampusList() : false)
  }//open()

  edit(i)
  {
    console.log(this.campus_list[i].name)
    const modalRef = this.modalService.open(ModalComponent)
    modalRef.componentInstance.formData = this.campus_list[i]
    modalRef.result.then(result => result ? this.getCampusList() : false)
  }//edit()

  delete(i)
  {
    Swal.fire({
      title: '¿Estas seguro de querer eliminar este Campus?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value){
        this.campus_list[i].loader = true
        this.campusService.deleteCampus(this.campus_list[i].id)
        .subscribe(
          res => {
            console.log(res)
            this.campus_list[i].loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.getCampusList()
          },
          error => {
            console.log(error.error.message)
            this.campus_list[i].loader = false
            Swal.fire('¡Error!', error.error.message, 'warning')
          })
      } else {
        Swal.fire('', 'Campus no eliminado', 'warning')
      }
    })
  }//delete()

}////
