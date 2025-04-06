import { Card, Priority, Type } from '../features/board/boardtypes' 
import { nanoid } from 'nanoid';
import { dataUsers } from './users'

export const dataCardDone: Card[] = [
    { 
        id: nanoid(),
        number: 9, 
        title: "Integrate Google Sign-In support", 
        content: "Allow users to authenticate using their Google account via OAuth 2.0. Display Google profile picture and email after login, and handle token expiration gracefully",
        creatorId: dataUsers[4].id,
        assigneeId: dataUsers[1].id,
        priority: Priority.Medium,
        type: Type.Feature,
        createdAt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    { 
        id: nanoid(),
        number: 10, 
        title: "Broken pagination on search results", 
        content: "When performing a search, the pagination controls stop working after page 2. Investigate query parameter handling and confirm response structure from the API.",
        creatorId: dataUsers[3].id,
        assigneeId: dataUsers[0].id,
        priority: Priority.Low,
        type: Type.Bug,
        createdAt: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    
]

