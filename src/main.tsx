import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux';
import { store } from './app/store';
import CardPage from './features/board/CarPage'
import Board from './features/board/Board'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/card/:id/:idColumn" element={<CardPage />} />
            <Route path="/portfolio" element={<Board />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
     </Provider>
  </React.StrictMode>,
)
