import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from 'src/models/task.model';

import { ActivatedRoute } from '@angular/router';

import { TaskService } from '../../services/task.service';

import Swal from 'sweetalert2'

import { faSignOutAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  faSignOutAlt = faSignOutAlt;
  faCheck = faCheck;
  title: string = '';
  button_text:string = '';
  task_form: FormGroup;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private _taskService: TaskService, private _activatedRoute: ActivatedRoute) { this.createForm(); }

  ngOnInit(): void {
    let id = this._activatedRoute.snapshot.paramMap.get('id');

    if( id !== 'new' ){
      [ this.title, this.button_text ] = ['Edit task', 'Edit task'];
      this.getTask(id);
      return;
    }
    
    [ this.title, this.button_text ] = ['Create task', 'Create task'];
  }

  createTask(){ 
    if(this.task_form.invalid){
      this.task_form.markAllAsTouched();
      return;
    }
      const task = new TaskModel();
      task.setName( this.fieldName.value );
      task.setDescription( this.fieldDescription.value );

      Swal.fire({
        title: 'Creating task...',
        text: 'Please, wait until is created',
        icon: 'info',
      });

      Swal.showLoading();

      this._taskService.createTask(task).subscribe( data => {

        Swal.fire({
          title: 'Task created successfully',
          text: `Your task ${ task.getName() } has been created and stored`,
          icon: 'success'
        })
        this.task_form.reset();
      })
  }


  createForm(){
    this.task_form = this.formBuilder.group({
      name: [ '', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  getTask(id: string){
        this._taskService.getTask(id).subscribe( task => {
          this.fieldName.setValue(task.getName());
          this.fieldDescription.setValue(task.getDescription());
        })
  }

  get fieldName(){
    return this.task_form.get('name');
  }

  get fieldDescription() {
    return this.task_form.get('description');
  }


}
