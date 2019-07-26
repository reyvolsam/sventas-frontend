import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolGroupComponent } from './components/school-group/school-group.component'

const routes: Routes = [
  { path: '', component: SchoolGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolGroupRoutingModule { }
