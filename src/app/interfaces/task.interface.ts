import { Data } from "@angular/router";

export interface TaskInterface {
    getName(): string,
    getDescription(): string,
    getCreated_at(): string,
    getUpdated_at(): string,
    getId(): string,

    setId(id: string): void,
    setName(name: string): void,
    setDescription(description: string): void,
    setUpdated_at(udpated_at: string): void,
}