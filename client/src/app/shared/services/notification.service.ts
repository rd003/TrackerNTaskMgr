import { BehaviorSubject } from "rxjs"

export type Notification={
    id: string|null,
    message:string,
    severity:"info"|"error"|"success"
    fade?:boolean
}

export class NotificationService{
    private messageSubject = new BehaviorSubject<Notification[]>([]);
}