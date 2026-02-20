import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/Header/Header.scss';
import './components/Button/Button.scss';
import './components/WeekNavbar/WeekNavbar.scss';
import './components/WeekNavbar/DayNavbarItems/DayNavbarItems.scss';
import './components/TaskContainer/TaskContainer.scss'
import './components/TaskContainer/TaskItem/TaskItem.scss'
import './components/Calender/CalenderModal.scss'
import './components/Calender/MonthYearSelectorModal/MonthYearSelectorModal.scss'
import './components/CreateTask/CreateTask.scss'
import App from './App.tsx'
import ModalContextProvider from './store/Modal/ModalContextProvider.tsx';
import DateContextProvider from './store/Date/DateContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DateContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>   
    </DateContextProvider>
  </StrictMode>
)
