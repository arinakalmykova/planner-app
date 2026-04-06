export interface Task {
    id:number;
    title:string;
    description:string;
    dueDate:string;
    isCompleted:boolean;
    userId:number;
    priority: "низкий" | "средний" | "высокий";
}