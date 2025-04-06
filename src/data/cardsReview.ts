import { Card, Priority, Type } from '../features/board/boardtypes' 
import { nanoid } from 'nanoid';
import { dataUsers } from './users'

export const dataCardReview: Card[] = [
    { 
        id: nanoid(),
        number: 6, 
        title: "Clean up unused CSS classes", 
        content: "Audit the codebase for unused CSS selectors and remove them to reduce bundle size. Verify that UI components are not affected after cleanup",
        creatorId: dataUsers[1].id,
        assigneeId: dataUsers[2].id,
        priority: Priority.Medium,
        type: Type.Task,
        createdAt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    { 
        id: nanoid(),
        number: 7, 
        title: "Login page throws 500 error on Safari", 
        content: "Users report a server error when attempting to log in using Safari. Reproduce the issue, check backend logs, and identify the cause related to cookie handling",
        creatorId: dataUsers[3].id,
        assigneeId: dataUsers[2].id,
        priority: Priority.High,
        type: Type.Issue,
        createdAt: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    { 
        id: nanoid(),
        number: 8, 
        title: "Implement notifications dropdown in header", 
        content: "Add a dropdown menu to the top navigation bar to show unread notifications. Include timestamps and link each item to the related page or action",
        creatorId: dataUsers[0].id,
        assigneeId: dataUsers[0].id,
        priority: Priority.Low,
        type: Type.Feature,
        createdAt: new Date(new Date().getTime() - 13 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(new Date().getTime() + 16 * 24 * 60 * 60 * 1000).toISOString(),
    }
]

