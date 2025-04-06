import { useState } from 'react';
import {
  Typography,
  Box,
  Select, MenuItem, SelectChangeEvent,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { User } from './userstypes';
import IconLetter from './UserIconLetter'


function UserCombobox
({ 
    user,
    users,
    onChange,
    normal = false
}: { 
    user: User | undefined
    users: User[],
    onChange: (user: User) => void,
    normal?: boolean
}) {
    const [ userbox, setUserbox ] = useState<boolean>(normal)  
    const initial = user?.name.charAt(0).toUpperCase();

    const handleChange = (e: SelectChangeEvent<string>) => {
        const selected = users.find(u => u.id === e.target.value);
        if (selected) {
            onChange(selected);
        }
        if (!normal) {
            setUserbox(false);
        }
 
    };

    const handleUserClick = () => {
        setUserbox(true);
    };

    const handleUserBlur = () => {
        setUserbox(false);
    };

    return (
        <Box 
            sx={{
                ...(normal
                ? {
                    width: '100%',
                }
                : {
                    paddingTop: '10px'
                })
            }} 
        >
            {userbox ? (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'start',
                    padding: '0px', 
                    gap: 1,
                }}>
                    <Select
                        onBlur={normal ? undefined : handleUserBlur}
                        label={normal ?  'Assigned' : ''} 
                        value={user?.id ?? ''}
                        onChange={handleChange}
                        size="small"
                        IconComponent={ArrowDropDown}
                        autoFocus
                        sx={{
                            ...(normal
                              ? {
                                width: '100%',
                              }
                              : {
                                  fontSize: 13,
                                  flexGrow: 1,
                                  padding: '0px',
                                  height: '28px',
                                  lineHeight: '1',
                                  width: '100%',
                                })
                          }}
                    >
                    {users.map((u: User) => {
                            const initial = u?.name.charAt(0).toUpperCase();
                            return (
                                <MenuItem key={u.id} value={u.id}>
                                <Box display="flex" alignItems="center" gap={1}
                                >
                                    <IconLetter initial={initial} backgroundcolor={u?.color} normal={normal}/>
                                    <Typography 
                                      sx={{
                                        ...(normal
                                          ? {
                                          }
                                          : {
                                              fontSize: 13,
                                            })
                                      }}
                                    >{u.name}</Typography>
                                </Box>
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Box>
            ) : (
                <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'start',
                        padding: '0px', 
                        gap: 1,
                        cursor: 'pointer'
                    }}  onClick={handleUserClick}>
                    <IconLetter initial={initial} backgroundcolor={user?.color} normal={normal}/>
                    <Typography sx={{ flexGrow: 1, fontSize: 13 }}>
                        {user?.name}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}



export default UserCombobox;