import { Card, Priority, Type } from '../features/board/boardtypes' 
import { nanoid } from 'nanoid';
import { dataUsers } from './users'

export const dataCardTodo: Card[] = [
    { 
        id: nanoid(),
        number: 1, 
        title: "Refactor authentication middleware", 
        content: "Update the existing Express.js middleware to support JWT validation and refresh token logic. Ensure backward compatibility and write unit tests for new scenarios",
        creatorId: dataUsers[0].id,
        assigneeId: dataUsers[1].id,
        priority: Priority.High,
        type: Type.Feature,
        createdAt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    { 
        id: nanoid(),
        number: 2, 
        title: "Optimize image loading on dashboard", 
        content: "Use lazy loading and compression techniques to reduce initial load time. Evaluate performance before and after using Lighthouse and report improvements.",
        creatorId: dataUsers[0].id,
        assigneeId: dataUsers[2].id,
        priority: Priority.Low,
        type: Type.Bug,
        createdAt: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    { 
        id: nanoid(),
        number: 3, 
        title: "Implement dark mode toggle", 
        content: "Add a toggle switch in the settings panel to enable dark mode. Ensure that theme changes are persisted and applied across sessions using local storage.",
        creatorId: dataUsers[1].id,
        assigneeId: dataUsers[0].id,
        priority: Priority.Medium,
        type: Type.Task,
        createdAt: new Date(new Date().getTime() - 13 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(new Date().getTime() + 16 * 24 * 60 * 60 * 1000).toISOString(),
    }
]

