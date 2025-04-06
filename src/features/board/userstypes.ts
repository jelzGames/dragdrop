import { Person, AccountCircle , Face, Pets, SportsEsports } from '@mui/icons-material';

export enum IconNames {
    Person = 'Person',
    AccountCircle = 'AccountCircle',
    Face = 'Face',
    Pets = 'Pets',
    SportsEsports = 'SportsEsports'
}

export const IconArray = Object.values(IconNames);

export const IconMap = {
    Person,
    AccountCircle,
    Face,
    Pets,
    SportsEsports
};

export type User = { 
    id: string;
    name: string, 
    icon:  string,
    color: string
}


