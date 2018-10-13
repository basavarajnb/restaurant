import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    }
    // {
    //     path: 'home',
    //     loadChildren: './modules/home/home.module#HomeModule'
    // }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,
            { enableTracing: false })
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AppRoutingModule { }
