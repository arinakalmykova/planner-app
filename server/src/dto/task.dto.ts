export interface CreateTaskDto {
    title:string;
    description:string;
    dueDate:string;
    priority: "низкий" | "средний" | "высокий";
}

export interface UpdateTaskDto {
    id?:number;
    title?:string;
    description?:string;
    dueDate?:string;
    isCompleted?:boolean;
    priority: "низкий" | "средний" | "высокий";
}

