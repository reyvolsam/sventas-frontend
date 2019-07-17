import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CampusService } from 'src/app/services/campus/campus.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() formData;

  campusForm: FormGroup
  campus_submitted:Boolean = false
  campus_loader:Boolean = false

  constructor(
    private campusService: CampusService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
    ) {
      this.campusForm = this.formBuilder.group({
        id: [],
        name: ['', [Validators.required]],
        description: ['', []],
        loader: []
      })
    }//

  ngOnInit(){
    this.campusForm.setValue(this.formData)
  }

    get c(){ return this.campusForm.controls }


  onSubmit()
  {
    this.campus_submitted = true
    if (this.campusForm.invalid) {
      return;
    } else {
      this.campus_loader = true
      if(this.campusForm.value.id === null){
        this.campusService
        .saveCampus(this.campusForm.value)
        .subscribe(
          (res) => {
            console.log(res)
            this.campus_loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.activeModal.close(true)
          },
          error => {
            this.campus_loader = false
            Swal.fire('¡Error!', error.error.message, 'error')
          })
      } else {
        this.campusService
        .updateCampus(this.campusForm.value)
        .subscribe(
          (res) => {
            console.log(res)
            this.campus_loader = false
            Swal.fire('¡Éxito!', res.message, 'success')
            this.activeModal.close(true)
          },
          error => {
            this.campus_loader = false
            Swal.fire('¡Error!', error.error.message, 'error')
          })
      }
    }
  }//CreateCampus()

  Close()
  {
    this.activeModal.close(false)
  }
}////
