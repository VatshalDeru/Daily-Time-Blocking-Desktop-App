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
import './components/CreateTask/CreateTask.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
