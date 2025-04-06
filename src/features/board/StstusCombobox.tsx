import { useState } from 'react';
import {
  Typography,
  Box,
  Select, MenuItem, SelectChangeEvent, 
} from '@mui/material';
import { ColumnId } from './boardtypes'
import { columnNames } from './boardtypes';

function StatusCombobox
({ 
    columnId,
    onMoveCard,
    normal = false
}: { 
    columnId?: ColumnId,
    onMoveCard: (to: ColumnId) => void,
    normal?: boolean
}) {
    const [ statusbox, setStatusbox ] = useState<boolean>(normal)  
    
    const handleChange = (e: SelectChangeEvent<ColumnId>) => {
        onMoveCard(e.target.value as ColumnId);
        if (!normal) {
            setStatusbox(false);
        }
    };

    const handleClick = () => {
        setStatusbox(true);
    };

    const handleBlur = () => {
        setStatusbox(false);
    };

    return (
        <Box
        sx={{
            ...(normal
            ? {
                width: '100%',
            }
            : {
                textAlign: 'start',
                paddingTop: '10px', 
            })
        }}>
            {statusbox ? (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'start',
                    padding: '0px', 
                    gap: 1,
                }}>
                    {!normal &&
                        <Typography fontSize={13} >Status: </Typography>
                    }
                    <Select
                        onBlur={normal ? undefined : handleBlur}
                        label={normal ? "Status" : undefined}
                        value={columnId ? columnId : ''}
                        onChange={handleChange}
                        size="small"
                        autoFocus
                        sx = {{
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
                                margingleft: '10px' 
                                })
                          }}
                    >
                        {columnNames.map((u: ColumnId) => (
                            <MenuItem key={u} value={u} >
                            <Box display="flex" alignItems="center" gap={1} sx={{paddingleft: '5px' }}>
                                <Typography  sx={{
                                        ...(normal
                                          ? {
                                          }
                                          : {
                                              fontSize: 13,
                                            })
                                      }}>{u}</Typography>
                            </Box>
                            </MenuItem>
                        ))}
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
                    }}  onClick={handleClick}>
                    <Typography fontSize={13}>Status: </Typography>
                    <Typography sx={{ flexGrow: 1, fontSize: 13 }}>
                        {columnId}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}


export default StatusCombobox;