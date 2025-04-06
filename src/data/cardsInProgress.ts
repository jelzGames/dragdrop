import { Card, Priority, Type } from '../features/board/boardtypes' 
import { nanoid } from 'nanoid';
import { dataUsers } from './users'

export const dataCardInprogress: Card[] = [
    { 
        id: nanoid(),
        number: 4, 
        title: "Update API endpoint for user profile", 
        content: "Modify the /api/user endpoint to include additional fields: phoneNumber and role. Ensure all frontend forms are updated accordingly and existing tests are adjusted.",
        creatorId: dataUsers[0].id,
        assigneeId: dataUsers[3].id,
        priority: Priority.Low,
        type: Type.Task,
        createdAt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    { 
        id: nanoid(),
        number: 5, 
        title: "Optimize image loading on dashboard", 
        content: "mplement drag-and-drop functionality using @dnd-kit for smoother task reordering. Ensure compatibility across desktop and mobile browsers.",
        creatorId: dataUsers[3].id,
        assigneeId: dataUsers[4].id,
        priority: Priority.High,
        type: Type.Feature,
        createdAt: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    
]

