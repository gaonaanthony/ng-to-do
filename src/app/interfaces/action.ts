import { ToDoListItem } from './to-do-list-item';

export interface Action {
    action: string;
    data: ToDoListItem,
    id: number,
    inputs: any[]
}