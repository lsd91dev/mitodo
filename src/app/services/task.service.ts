import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { TaskInterface } from '../interfaces/task.interface';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { TaskModel } from 'src/models/task.model';

const DELAY_MAX = 1000;


@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private _http: HttpClient) {  }

  createTask(task: TaskInterface): Observable<TaskInterface>{
    return this._http.post<TaskInterface>(`${ environment.urlDB}/tasks.json`, task)
    .pipe( delay(DELAY_MAX));
  }

  getTasks(): Observable<TaskInterface[]> {
    return this._http.get<TaskInterface>(`${ environment.urlDB }/tasks.json`).pipe( map(tasks => this.filterTasks(tasks)));
  }

  getTask(id: string): Observable<TaskInterface> {
    return this._http.get<TaskInterface>(`${ environment.urlDB}/tasks/${ id }.json`).pipe( 
      map(task => this.createTaskModel(id, task['name'], task['description'])))
  }

  removeTask(id: string) {
    return this._http.delete(`${ environment.urlDB }/tasks/${ id }.json`).pipe( delay(DELAY_MAX));
  }

  

  filterTasks(tasks: TaskInterface): TaskInterface[]{
    let task_array: TaskInterface[] = [];
    Object.keys(tasks).forEach( key => {
      let taskModel = this.createTaskModel(key, tasks[key].name, tasks[key].description);
      task_array.push(taskModel);
    })
    return task_array;
  }


  createTaskModel(id: string, name: string, description: string){
    let task_model = new TaskModel();
      task_model.setId(id);
      task_model.setName(name);
      task_model.setDescription(description);
    return task_model;
  }

}
