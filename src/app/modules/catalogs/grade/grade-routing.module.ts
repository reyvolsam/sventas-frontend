import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GradeComponent } from './components/grade/grade.component';

const routes: Routes = [
  { path: '', component: GradeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
