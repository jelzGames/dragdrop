import { useState } from 'react'
import {
  DndContext,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable
} from '@dnd-kit/core'
import { nanoid } from 'nanoid'
import { Card,  columnNames, ColumnId, Priority, Type } from './boardtypes'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addCardToTheColumn, moveCard, selectColumns } from './columnsSlice';
import { usersRoot } from './usersSlice';
import { coutersRoot, updateCounter } from './CounterSlices';
import { useSelector } from 'react-redux';
import CardComponent from "./Card"
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Board() {
  const columns = useSelector(selectColumns);
  const users = useSelector(usersRoot);
  const counters = useSelector(coutersRoot);
  const dispatch = useDispatch<AppDispatch>();
  const sensors = useSensors(useSensor(PointerSensor))
  const [isDrag, setIsDrag] = useState<boolean>(false);
   const navigate = useNavigate();

  const userId = users[0].id;

  const onBackClick = () => {
    navigate('/'); 
  } 

  const setTotalCards = (total: number) => {
    dispatch(
      updateCounter({
        id: "Cards",
        total
      })
    );
  }
 
  const handleDragStart = () => {
    setIsDrag(true);
  }
  
  const handleDragEnd = (event: DragEndEvent) => {
    setIsDrag(false);

    const { active, over } = event;
    if (!over) return;
  
    const activeId = active.id as string;
    const overId = over.id as string;
  
    const fromCol = columnNames.find(col =>
      columns[col].some(card => card.id === activeId)
    );
  
    if (!fromCol) return;

    const isOverColumn = columnNames.includes(overId as ColumnId);
    
    const toCol = isOverColumn
      ? (overId as ColumnId)
      : columnNames.find(col => columns[col].some(card => card.id === overId));
  
    if (!toCol) return;

    dispatch(
      moveCard({
        fromCol,
        toCol,
        activeId,
        overId,
        isOverColumn: false
      })
    );
    
  };

  return (
    <div>
      <div style={{ textAlign: 'start' }}>
        <Typography
              onClick={onBackClick}
              variant="body2"
              color="text.secondary"
              sx={{ cursor: 'pointer', marginLeft: '20px', fontWeight: '600' }}
          >
              ← Back
          </Typography>
      </div>
        
      <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}>
        <div style={{ display: 'flex', gap: '5px', padding: '16px' }}>
          {columnNames.map(column => (
            <Column key={column} id={column} cards={columns[column]} userId={userId}
            totalCards={counters.Cards} setTotalCards={setTotalCards} dispatch={dispatch} isDrag={isDrag}/>
          ))}
        </div>
      </DndContext>
    </div>
  )
}

function Column({ 
  id, cards, setTotalCards, totalCards, dispatch, userId, isDrag
}: { 
  isDrag: boolean,
  dispatch: AppDispatch, 
  totalCards: number, 
  setTotalCards: (total: number) => void, 
  id: ColumnId, cards: Card[] ; 
  userId: string
}) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      id={id}
      style={{
        flex: 1,
        padding: '0px',
        background: '#f1f1f1',
        borderRadius: '8px',
        minHeight: '100vh',       
        height: 'auto',
        flexGrow: 1,
        overflow: 'visible', 
      }}
    >
       <div
        style={{
          paddingLeft: '10px',
          paddingBottom: '10PX',
          background: 'white',
          textAlign: 'start',
          position: 'sticky',
          borderBottom: '1px solid #cccccc',
          top: 0,
          zIndex: 0,
        }}
      >
        {id}
      </div>
      {id === 'To Do' &&
        <NewItemComponent setTotalCards={setTotalCards} totalCards={totalCards} userId={userId}
        dispatch={dispatch}></NewItemComponent>
      }
      {cards.map(card => (
        <CardComponent key={card.id} card={card} columnId={id} isDrag={isDrag}/>
      ))}
    </div>
  )
}

function NewItemComponent({
  dispatch, 
  totalCards, 
  setTotalCards,
  userId
}: {
  dispatch: AppDispatch, 
  totalCards: number, 
  setTotalCards: (total: number) => void, 
  userId: string
}) {

  const addCard = () => {
    const newTotal = totalCards + 1;

    setTotalCards(newTotal);
   
    const now = new Date();
    const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    dispatch(addCardToTheColumn({
      id: 'To Do',
      card: { id: nanoid(), title: `New card`, content: "", number: newTotal, creatorId: userId, assigneeId: userId,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), dueDate: twoWeeksLater.toISOString(),
        priority: Priority.Medium, type: Type.Task
       }
    }));

  }

  return (
    <div
      style={{
        marginLeft: '10px',
        marginBottom: '10px',
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        background: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'default',
        width: 'fit-content'
      }}
    >
      <div
        onClick={addCard} 
        style={{
          width: '24px',
          height: '24px',
          backgroundColor: '#1976d2',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer'
       
        }}
      >
        +
      </div>
      <span style={{ fontSize: '12px',  paddingLeft: '5px', paddingTop: '2px',
          paddingRight: '10px',
         }}>New Item</span>
    </div>
  )
}

