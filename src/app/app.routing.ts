import {Routes, RouterModule} from '@angular/router'
import {AuthGuard} from './helpers/auth.guard'

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './modules/home/home.module#HomeModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: './modules/login/login.module#LoginModule'
    },
    {
        path: 'user',
        loadChildren: './modules/user/user.module#UserModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'catalogs/campus',
        loadChildren: './modules/catalogs/campus/campus.module#CampusModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'catalogs/grade',
        loadChildren: './modules/catalogs/grade/grade.module#GradeModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'catalogs/group',
        loadChildren: './modules/catalogs/school-group/school-group.module#SchoolGroupModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'student',
        loadChildren: './modules/student/student.module#StudentModule',
        canActivate: [AuthGuard]
    },
    {
        path: '**', redirectTo: ''
    }
]

export const AppRouting = RouterModule.forRoot(appRoutes)
