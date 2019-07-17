import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Campus } from 'src/app/models/Campus';
import { CampusService } from 'src/app/services/campus/campus.service';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModalConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData;

  userForm: FormGroup
  user_submitted:Boolean = false
  loader:Boolean = false
  campus_loader:Boolean = false

  groups_list = [
    { id: 1, name: 'root' },
    { id: 2, name: 'Administrador' },
    { id: 3, name: 'Contabilidad' },
    { id: 4, name: 'Vendedor' }
  ]

  campus_list:Campus[] = []
  campus:Campus
  
  constructor(
    private campusService: CampusService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { 
    this.userForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      group_id: [1, [Validators.required]],
      campus_id: [null, [Validators.required]],
      campus: [],
      group: [],
      loader: []
    })

    this.getCampusList()
  }

  ngOnInit() {
    this.formData.group_id = 1
    console.log('this.formData', this.formData)
    this.userForm.setValue(this.formData)
  }

  get c(){ return this.userForm.controls }

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
    this.user_submitted = true
    if (this.userForm.invalid) {
      return;
    } else {
      this.loader = true
      if(this.userForm.value.id === null){
        this.userService
        .saveUser(this.userForm.value)
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
        .updateUser(this.userForm.value)
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
