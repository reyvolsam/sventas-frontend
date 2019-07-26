import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modules/student/components/modal/modal.component';
import { Student } from 'src/app/models/Student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentForm:Student = {
    id: null,
    enrollment: '',
    name: '',
    grade_id: null,
    loader: false
  }

  constructor(
    private modalService: NgbModal,
    modal_config: NgbModalConfig
  ) {
    modal_config.backdrop = 'static'
    modal_config.keyboard = false
   }

  ngOnInit() {
  }

  open()
  {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.formData = this.studentForm
  }//open()
  
}
