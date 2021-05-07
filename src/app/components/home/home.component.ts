import { Component, OnInit } from '@angular/core';
import { TaskInterface } from 'src/app/interfaces/task.interface';
import { TaskService } from '../../services/task.service';

import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks: TaskInterface[];
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private _taskService: TaskService) { }

  ngOnInit(): void { 
    this._taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
  }


  removeTask(id: string, index: number, name: string){
    let confirmRemove = Swal.fire({
      title: 'Remove task',
      text:`Are you sure you want to remove #${ index } ${ name } `,
      showConfirmButton: true,
      showCancelButton: true,
    });

    confirmRemove.then( ({isConfirmed}:any)=> {

      if(!isConfirmed){ return null }

      Swal.fire({
        title: `Removing #${ index } ${ name}`,
        html: `Please wait until ${ name } is removed `,
      })
      Swal.showLoading();
      this._taskService.removeTask(id).subscribe( task => {
        this.tasks.splice(index, 1);
        Swal.fire({
          title: 'Removed successfully',
          html: `Task # ${ index } removed`,
          icon:'success',
          showCloseButton: true,
        })  
        })
    }
    )
    


  }

}
