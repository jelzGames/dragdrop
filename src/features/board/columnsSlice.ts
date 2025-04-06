import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, ColumnId, Col } from "./boardtypes"
import { RootState } from '../../app/store'; 
import { dataCardTodo } from '../../data/cardsTodo'
import { dataCardInprogress } from '../../data/cardsInProgress'
import { dataCardReview } from '../../data/cardsReview'
import { dataCardDone } from '../../data/cardsDone'

const initialState: Col = {
  'To Do': dataCardTodo,
  'In Progress': dataCardInprogress,
  'Review': dataCardReview,
  'Done': dataCardDone,
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addCardToTheColumn(state, action: PayloadAction<{ id: ColumnId; card: Card }>) {
      const { id, card } = action.payload;
      state[id].push(card);
    },
  
    removeCardOfTheColumn(state, action: PayloadAction<{ id: ColumnId; card: Card }>) {
      const { id, card } = action.payload;
      state[id] = state[id].filter(c => c.id !== card.id);
    },
  
    updateCardInColumn(state, action: PayloadAction<{ id: ColumnId; card: Card }>) {
      const { id, card } = action.payload;
      const index = state[id].findIndex(c => c.id === card.id);
      if (index !== -1) {
        state[id][index] = card;
      }
    },

    moveCard(
      state,
      action: PayloadAction<{
        fromCol: ColumnId;
        toCol: ColumnId;
        activeId: string;
        overId: string;
        isOverColumn: boolean;
      }>
    ) {
      const { fromCol, toCol, activeId, overId, isOverColumn } = action.payload;
   
      const fromCards = [...(state[fromCol] || [])];
      const toCards = fromCol === toCol ? [...fromCards] : [...(state[toCol] || [])];
    
      const fromIndex = fromCards.findIndex(c => c.id === activeId);
      if (fromIndex === -1) return;
    
      let [movingCard] = fromCards.splice(fromIndex, 1);
    
      let insertAt = toCards.length;
    
      if (!isOverColumn && overId) {
        const overIndex = toCards.findIndex(c => c.id === overId);
        if (overIndex !== -1) {
          insertAt = overIndex;
        }
      }
    
      if (fromCol === toCol && fromIndex === insertAt) {
        return;
      }
    
      if (fromCol === toCol) {
        toCards.splice(fromIndex, 1); 
      }
    
      toCards.splice(insertAt, 0, movingCard);
    
      state[fromCol] = fromCol === toCol ? toCards : fromCards;
      state[toCol] = toCards;
    },

    moveCardFromStatus(
      state,
      action: PayloadAction<{
        fromCol: ColumnId;
        activeId: string,
        toCol: ColumnId;
       }>
    ) {
      const { fromCol, toCol, activeId } = action.payload;
    
      const fromCards = [...(state[fromCol] || [])];
      const toCards = fromCol === toCol ? [...fromCards] : [...(state[toCol] || [])];
    
      const fromIndex = fromCards.findIndex(c => c.id === activeId);
      if (fromIndex === -1) return;
    
      let [movingCard] = fromCards.splice(fromIndex, 1);
    
      toCards.splice(0, 0, movingCard);
    
      state[fromCol] = fromCards;
      state[toCol] = toCards;
    }
    
  }
  
});

export const selectColumns = (state: RootState) => state.columns;
export const { addCardToTheColumn, removeCardOfTheColumn, 
               updateCardInColumn, moveCard, moveCardFromStatus } = columnsSlice.actions;
export default columnsSlice.reducer;

