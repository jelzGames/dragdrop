import AssignmentIcon from '@mui/icons-material/Assignment';    
import BugReportIcon from '@mui/icons-material/BugReport'; 
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'; 
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; 
import { SvgIconComponent } from '@mui/icons-material';

export type ColumnId = 'To Do' | 'In Progress' | 'Review' | 'Done'
export type Card = { 
    id: string;
    number: number, 
    title: string, 
    content: string,
    creatorId: string,
    assigneeId?: string;
    priority?: Priority;
    type?: Type;
    createdAt?: string;
    updatedAt?: string;
    dueDate?: string;
}

export enum  Priority {
    High = 'High', 
    Medium = 'Medium',
    Low = 'Low',
}


export const PriorityColors = {
    [Priority.High]: 'red',
    [Priority.Medium]: 'orange',
    [Priority.Low]: 'green'
}

export enum Type {
    Task = 'task',
    Bug = 'bug',
    Feature = 'feature',
    Issue = 'issue'
}


export const IconTypes = {
    [Type.Task]: AssignmentIcon,
    [Type.Bug]: BugReportIcon,
    [Type.Feature]: AutoFixHighIcon,
    [Type.Issue]: ReportProblemIcon
}

export type Col = Record<ColumnId, Card[]>;

export const columnNames: ColumnId[] = ['To Do', 'In Progress', 'Review', 'Done']

