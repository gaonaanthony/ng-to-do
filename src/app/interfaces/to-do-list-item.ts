export interface ToDoListItem {
    userId: number;
    id: number;
    title: string;
    completed: boolean,
    editing?: boolean
}