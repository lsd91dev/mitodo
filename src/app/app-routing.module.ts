import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './components/home/home.component';
import { TaskComponent } from './components/task/task.component';


const routes: Routes = [
  { path: 'mitodo', component: HomeComponent },
  { path: 'task/:id', component: TaskComponent},
  { path: '**', pathMatch: 'full', redirectTo:'mitodo'}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
