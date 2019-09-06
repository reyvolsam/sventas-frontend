import {Routes, RouterModule} from '@angular/router'
import {AuthGuard} from './helpers/auth.guard'

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'catalogs/campus',
        loadChildren: () => import('./modules/catalogs/campus/campus.module').then(m => m.CampusModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'catalogs/grade',
        loadChildren: () => import('./modules/catalogs/grade/grade.module').then(m => m.GradeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'catalogs/group',
        loadChildren: () => import('./modules/catalogs/school-group/school-group.module').then(m => m.SchoolGroupModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'student',
        loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**', redirectTo: ''
    }
]

export const AppRouting = RouterModule.forRoot(appRoutes)
