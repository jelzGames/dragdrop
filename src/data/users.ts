import { nanoid } from 'nanoid';
import { IconNames } from "../features/board/userstypes"
import { User } from '../features/board/userstypes'

export const dataUsers: User[] = [
    {
      id: nanoid(),
      name: 'Alice',
      icon: IconNames.Person,
      color: 'red'
    },
    {
      id: nanoid(),
      name: 'Bob',
      icon: IconNames.AccountCircle,
      color: 'green'
    },
    {
      id: nanoid(),
      name: 'Charlie',
      icon: IconNames.Face,
      color: 'orange'
    },
    {
      id: nanoid(),
      name: 'Diana',
      icon: IconNames.Pets,
      color: 'blue'
    },
    {
      id: nanoid(),
      name: 'Ethan',
      icon: IconNames.SportsEsports,
      color: 'brown'
    }
  ]