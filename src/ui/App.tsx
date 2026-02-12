// import { useState } from 'react'
import './App.css'
import Header from './components/Header/Heaeder'
import TaskContainer from './components/TaskContainer/TaskContainer'
import WeekNavbar from './components/WeekNavbar/WeekNavbar'
import Button from './components/Button/Button'
import CreateTask from './components/CreateTask/CreateTask'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='appContainer
    '>
      <Header month='February' year={2026}/>
      <WeekNavbar/>
      <CreateTask/>
      {/* <Button variant="create-task"
        icon={<svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="white"/>
        </svg>}
      /> */}
      <TaskContainer/>
    </div>
  )
}

export default App
