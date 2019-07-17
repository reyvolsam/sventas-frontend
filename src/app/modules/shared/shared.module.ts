import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class SharedModule { }
