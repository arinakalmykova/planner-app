export interface CreateTaskDto {
    title:string;
    description:string;
    dueDate:string;
    priority: "low" | "medium" | "high";
}

export interface UpdateTaskDto {
    id?:number;
    title?:string;
    description?:string;
    dueDate?:string;
    isCompleted?:boolean;
    priority?: "low" | "medium" | "high";
}

