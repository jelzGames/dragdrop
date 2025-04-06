import { ColumnId, Priority, Card as CardType, Type } from './boardtypes'
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { usersRoot } from './usersSlice';
import { useSelector } from 'react-redux';
import { selectColumns } from './columnsSlice';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Box,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
  } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { updateCardInColumn, moveCardFromStatus } from "./columnsSlice"
import UserCombobox from './UserCombobox'
import StstusCombobox from './StstusCombobox'
import { User } from './userstypes';
import IconLetter from './UserIconLetter'

export default function CardItem({
 id,
 columnId 
}: {
  id: string | undefined,
  columnId: ColumnId 
}) {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(usersRoot);
  const columns = useSelector(selectColumns);
  const navigate = useNavigate();
  const [card, setCard] = useState<CardType>();
  const [saved, setSaved] = useState<boolean>();
  const [creator, setCreator] = useState<User>();
  const [user, setUser] = useState<User>();
  const [to, setTo] = useState<ColumnId>();

  useEffect(() => {
    const cardSelected = columns[columnId].find(c => c.id === id);
    setCard( cardSelected ? { ...cardSelected } : undefined);
    const user = users.find(x => x.id == cardSelected?.assigneeId)
    setUser(user);
    const creator = users.find(x => x.id == cardSelected?.creatorId)
    setCreator(creator);
    setTo(columnId);
  }, [id, columnId])

  const OnChangeUser = (user: User) => {
    if (card && card.assigneeId !== user.id) {
        onChange('assigneeId', user.id);
        const newuser = users.find(x => x.id == user.id)
        setUser(newuser);
    }
  }

  const onBackClick = () => {
    navigate('/portfolio'); 
  } 

  const OnMoveCard = (to: ColumnId) => {
    setTo(to);
  }

  const onChange = <K extends keyof CardType>(id: K, value: CardType[K]) => {
    setCard((prev) => {
      if (!prev) return undefined; 
      return {
        ...prev,
        [id]: value
      };
    });
    setSaved(false);
  };
  

  const onSave = () => {
    if (card && to) {
        dispatch(
            updateCardInColumn({
                id: to,
                card: card 
            })
        );
    }
    setSaved(true);
    if (card && to && columnId !== to) {
      dispatch(
        moveCardFromStatus({
          fromCol: columnId,
          activeId: card.id,
          toCol: to
        })
      );
    }

   
  }
  const initial = creator?.name.charAt(0).toUpperCase();

  return (
    <Card variant="outlined" sx={{ maxWidth: '100%', mb: 2, position: 'relative' }}>
      <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            pt: 1,
        }}
        >
       
        <Typography
            onClick={onBackClick}
            variant="body2"
            color="text.secondary"
            sx={{ cursor: 'pointer' }}
        >
            ← Back
        </Typography>

        <Typography
            variant="body1"
            color="text.primary"
            sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
        >
            Card number: {card?.number ?? 0}
        </Typography>

        <Button
            onClick={onSave}
            variant="text"
            startIcon={
            saved ? <CheckCircleIcon sx={{ color: 'success.main' }} /> : null
            }
            sx={{ textTransform: 'none', fontWeight: 500 }}
        >
            Save
        </Button>
      </Box>


      <CardContent sx={{ pb: 2 }}>
        <Box 
          sx={{
            display: 'flex',
            flexWrap: 'wrap', 
            gap: 10, 
            px: 1,
            pt: 1,
        }}
        >
          <Box
           sx={{
            flex: '1 1 60%',
            minWidth: '300px', 
          }}
          >
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              size="small"
              value={card?.title ?? ""}
              onChange={(e) => onChange("title", e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              size="small"
              value={card?.content}
              onChange={(e) => onChange("content", e.target.value)}
              minRows={10}
            />
          </Box>
          <Box 
           sx={{
            flex: '1 1 30%',
            minWidth: '300px', 
          }}>

            <FormControl size="small" fullWidth sx={{ mb: 2 }}>
              <InputLabel>Assigned</InputLabel>
              <UserCombobox user={user} users={users} onChange={OnChangeUser} normal={true} />
            </FormControl>     
 
            <DatePicker 
              label="Due Date"
              value={card?.dueDate ? dayjs(card.dueDate) : null}
              onChange={(date) => onChange("dueDate", date?.toISOString())}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
              sx={{ mb: 2 }}
            />

            <FormControl size="small" fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={card?.priority ?? Priority.Medium}
                label="Priority"
                onChange={(e) => onChange("priority", e.target.value as Priority)}
                sx={{
                  '& .MuiSelect-select': {
                    textAlign: 'left'
                  }
                }}
              >
                {Object.values(Priority).map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth sx={{ mb: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={card?.type ?? Type.Task }
                label="Type"
                onChange={(e) => onChange("type", e.target.value as Type)}
                sx={{
                  '& .MuiSelect-select': {
                    textAlign: 'left'
                  }
                }}
              >
                {Object.values(Type).map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <StstusCombobox columnId={to} onMoveCard={OnMoveCard} normal={true}/>
            </FormControl>        
          
            <Box sx={{display: 'flex',  alignItems: "center", textAlign: 'left', gap: 2, mt:1}}>
              <Box  >
                <Typography sx={{ flexGrow: 1, fontWeight: 600 }}>
                    Create by 
                </Typography>
              </Box>
              <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'start',
                        padding: '0px', 
                        gap: 1,
                    }}  
                >
                <IconLetter initial={initial} backgroundcolor={creator?.color} normal={true}/>
                <Typography sx={{ flexGrow: 1 }}>
                    {creator?.name}
                </Typography>
              </Box>
            </Box>
          
            <Box sx={{display: 'flex',  alignItems: "center", textAlign: 'left', gap: 2, mt:1}}>
            
              <Box >
                <Typography sx={{ flexGrow: 1, fontWeight: 600 }}>
                    Create at 
                </Typography>
              </Box>
              <Box >
                <Typography sx={{ flexGrow: 1}}>
                  {card?.createdAt ? new Date(card?.createdAt).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }) : ''}
                </Typography>
              </Box>
            </Box>

            <Box sx={{display: 'flex',  alignItems: "center", textAlign: 'left', gap: 2, mt:1}}>
            
              <Box >
                <Typography sx={{ flexGrow: 1, fontWeight: 600 }}>
                    Last update 
                </Typography>
              </Box>
              <Box >
                <Typography sx={{ flexGrow: 1 }}>
                    {card?.updatedAt ? new Date(card?.updatedAt).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }) : ''}
                </Typography>
              </Box>
            </Box>  
          </Box>  
        </Box>  
      </CardContent>
    </Card>
  );
}
