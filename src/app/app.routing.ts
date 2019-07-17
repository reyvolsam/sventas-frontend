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
        path: '**', redirectTo: ''
    }
]

export const AppRouting = RouterModule.forRoot(appRoutes)
