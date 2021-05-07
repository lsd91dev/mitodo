import { Data } from "@angular/router";
import { TaskInterface } from "src/app/interfaces/task.interface";

export class TaskModel implements TaskInterface {

    private id: string;
    private name: string;
    private description: string;
    private created_at: string;
    private updated_at: string;

    constructor(){
        this.created_at = `${new Date().getDate()}/${ new Date().getMonth() }/${ new Date().getFullYear() }`
        
    }

    getId(): string { return this.id; }

    getName(): string { return this.name; }

    getDescription(): string { return this.description }
    
    getCreated_at(): string { return this.created_at }

    getUpdated_at(): string { return this.updated_at }

    setId(id: string): void { this.id = id; }

    setName(name: string): void { this.name = name; }

    setDescription(description: string): void { this.description = description; }

    setUpdated_at(updated_at:string ): void { this.updated_at = updated_at; }
;
    
}
