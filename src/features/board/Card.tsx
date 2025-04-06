import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  IconButton,
  TextField,
  Box,
  Fade
} from '@mui/material';
import { Edit as EditIcon, Delete } from '@mui/icons-material';
import { Card as cardType, ColumnId, IconTypes, Type, PriorityColors, Priority } from './boardtypes'
import { AppDispatch } from '../../app/store';
import { updateCardInColumn, moveCardFromStatus, removeCardOfTheColumn } from './columnsSlice';
import { useDispatch } from 'react-redux';
import { useDraggable, useDroppable  } from '@dnd-kit/core'
import { usersRoot } from './usersSlice';
import { useSelector } from 'react-redux';
import { User } from './userstypes';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useNavigate } from 'react-router-dom';
import UserCombobox from './UserCombobox'
import StstusCombobox from './StstusCombobox'
import { Chip } from '@mui/material';


type Draggable = ReturnType<typeof useDraggable>;
type Listeners = Draggable['listeners'];
type Attributes = Draggable['attributes'];

function CardComponent
({ 
  card,
  columnId,
  isDrag
}: { 
    card: cardType,
    columnId: ColumnId,
    isDrag: boolean
}) {
  const { id } = card; 
  const { attributes, listeners, setNodeRef: setDragRef, transform } = useDraggable({ id });
  const { setNodeRef: setDropRef } = useDroppable({ id });
  const [ editing, setEditing ] = useState<boolean>(false)  
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(usersRoot);
  
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setShowMessage(false);
  }, [isDrag])

  const handleShowDeleteMessageClick = () => {
    setShowMessage(true);
  };

  const handleDeleteClick = () => {
    dispatch(
        removeCardOfTheColumn({
        id: columnId,
        card })
    );
    setShowMessage(false);
  };

  const handleCancelDeleteClick = () => {
    setShowMessage(false);
  };

  const handleEditClick = () => {
    navigate(`/card/${card.id}/${columnId}`);
  };

  const user = users.find(x => x.id == card.assigneeId)
  const handleTitleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const OnChangeUser = (user: User) => {
    if (card.assigneeId !== user.id) {
        dispatch(updateCardInColumn({
            id: columnId,
            card: { ...card, assigneeId: user.id }
        }));
    }
  }

  const OnMoveCard = (to: ColumnId) => {
    if (columnId !== to) 
    {
        dispatch(moveCardFromStatus({
            fromCol: columnId,
            activeId: card.id,
            toCol: to
        }));
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (card.title !== e.target.value) 
    {
        dispatch(updateCardInColumn({
            id: columnId,
            card: { ...card, title: e.target.value }
        }));
    }
  };
  
  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition: 'transform 200ms ease',
    padding: '8px',
    margin: '15px',
    background: 'white',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    cursor: 'grab',
  };

  const setRefs = (el: HTMLElement | null) => {
    setDragRef(el);
    setDropRef(el);
  };

  return (
     
    <Card
        ref={setRefs}
        style={style}
        variant="outlined"
        sx={{
            maxWidth: 300,
            display: 'grid',
            gridTemplateAreas: `
                "top top top"
                "left center right"
                "bottom bottom bottom"
            `,
            gridTemplateColumns: '20px 1fr 20px',
            gridTemplateRows: 'auto 1fr auto',
            gap: 0,
            p: 1,
        }}
    >
         <Box
            {...listeners}
            {...attributes}
            gridArea="top"
            sx={{
                height: 20,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 1,
                pt: 1,
                pb: 2,
            }}
        >
            <StartIcon listeners={listeners}  attributes={attributes} number={card.number} type={card.type}/>
    
            <Box>
                <Chip
                    label={card.priority}
                    size="small"
                    sx={{
                        backgroundColor: card.priority ? PriorityColors[card.priority] : PriorityColors[Priority.Medium] ,
                        color: '#fff',
                    }}
                    />
            </Box>
        </Box> 

        <Box
            gridArea="left"
            {...listeners}
            {...attributes}
            sx={{ cursor: 'grab'}}
        />
   
        <Box gridArea="center" sx={{cursor: 'default', textAlign: 'start', paddingBottom: '10px'  }}>

            <Title editing={editing} card={card} handleBlur={handleBlur} handleTitleChange={handleTitleChange}
             handleTitleClick={handleTitleClick}/>
            <UserCombobox user={user} users={users} onChange={OnChangeUser}/>
            <StstusCombobox columnId={columnId} onMoveCard={OnMoveCard}/>
        </Box>    
        <Box
            gridArea="right"
            {...listeners}
            {...attributes}
            sx={{ cursor: 'grab'}}
        />
  
        <Box
            gridArea="bottom"
            sx={{
                height: 20,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 1
            }}
        >
            <Box {...listeners} {...attributes} sx={{ cursor: 'grab'}}>
            </Box>

            <Buttons
                showMessage={showMessage}
                handleCancelDeleteClick={handleCancelDeleteClick}
                handleDeleteClick={handleDeleteClick}
                handleEditClick={handleEditClick}
                handleShowDeleteMessageClick={handleShowDeleteMessageClick}
            />
        </Box>

    </Card>
  );
};

function StartIcon({ 
    listeners,
    attributes,
    number,
    type = Type.Task
}: { 
    listeners: Listeners,
    attributes:  Attributes,
    number: number,
    type: Type | undefined,
}) {
    const Icon = IconTypes[type];
    
    return (
        <Box
            gridArea="top"
            {...listeners}
            {...attributes}
            sx={{
                display: 'flex',
                cursor: 'grab',
                alignItems: 'center',
                paddingBottom: '10px',
                gap: 1
            }}
        >
            <Icon color="primary" sx={{ width: 20 }}/>
            <Typography sx={{fontSize: 13}}>{number}</Typography>
        </Box>
    )
}

function Title ({ 
    editing,
    card,
    handleTitleChange,
    handleBlur,
    handleTitleClick
}: { 
    editing: boolean,
    card: cardType,
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleBlur: () => void,
    handleTitleClick: () => void,
}) {
    return (
        <>
            {editing ? (
                <TextField
                    value={card.title}
                    onChange={handleTitleChange}
                    onBlur={handleBlur}
                    autoFocus
                    fullWidth
                    size="small"
                    InputProps={{
                        sx: { fontSize: 13, padding: '0px',  height: '28px',   lineHeight: '1'}
                    }}
                />
            ) : (
                <Box sx={{ maxWidth: 250 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        onClick={handleTitleClick}
                        sx={{ cursor: 'pointer', fontSize: 13,  overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%',}}
                    >
                        {card.title}
                    </Typography>
                </Box>
            )}
        </>
    )
} 



function Buttons ({ 
    showMessage,
    handleShowDeleteMessageClick,
    handleDeleteClick,
    handleCancelDeleteClick,
    handleEditClick,
}: { 
    showMessage: boolean,
    handleShowDeleteMessageClick: () => void,
    handleDeleteClick: () => void,
    handleCancelDeleteClick: () => void,
    handleEditClick: () => void,
}) {
    return (
        <Box sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'end',
                padding: '0px', 
                gap: 1,
            }}>

            <ClickAwayListener onClickAway={handleCancelDeleteClick}>

            <Box
                display="inline-flex"
                flexDirection="column"
                alignItems="center"
            >
                {!showMessage ? (
                    <IconButton onClick={handleShowDeleteMessageClick} size="small">
                        <Delete color="error" />
                    </IconButton>
                ) :
                (
                    <Fade in={showMessage} timeout={200}>
                        <Box
           
                            sx={{
                            right: '100%',
                            mr: 0,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transform: 'translateX(10px)',
                            animation: showMessage ? 'slideIn 500ms ease-out forwards' : undefined,
                            '@keyframes slideIn': {
                                from: { transform: 'translateX(10px)', opacity: 0 },
                                to: { transform: 'translateX(0)', opacity: 1 },
                            },
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ cursor: 'pointer', fontWeight: 500,  backgroundColor: 'error.main',  color: 'white', padding: '5px'}}
                                onClick={handleDeleteClick}
                            >
                                Remove
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    padding: '5px',

                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    backgroundColor: '#eeeeee',
                                }}
                                onClick={handleCancelDeleteClick}
                            >
                                Cancel
                            </Typography>
                        </Box>
                    </Fade>
                )}
            </Box>
            </ClickAwayListener>

            <IconButton onClick={handleEditClick} size="small"  sx={{ color:'#0288d1' }}>
                <EditIcon fontSize="small" />
            </IconButton>

        </Box>
    )
}

export default CardComponent;
