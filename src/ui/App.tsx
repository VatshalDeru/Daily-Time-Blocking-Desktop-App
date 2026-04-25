// import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import TaskContainer from './components/TaskContainer/TaskContainer'
import WeekNavbar from './components/WeekNavbar/WeekNavbar'
import Button from './components/Button/Button'
import CreateTask from './components/CreateTask/CreateTask'
import CalenderModal from './components/Calender/CalenderModal'
import { useContext } from 'react'
import { ModalContext } from './store/Modal/ModalContext'
import { TaskContext } from './store/Task/TaskContext'
import { DateContext } from './store/Date/DateContext'
import CreateTaskIcon from './components/icons/CreateTaskIcon'


function App() {
  const { calenderModal, createTaskModal } = useContext(ModalContext)
  const { currTask } = useContext(TaskContext);
  const { date, updateDate } = useContext(DateContext);

  const handelOpenCreateTaskModal = () => {
    currTask.setDate(date);
    createTaskModal.setIsCreating('create');
    createTaskModal.showModal();
  };

  console.log(window.electron);

  return (
    <div className='appContainer'>
      <Header/>
      {calenderModal.modalVisibility && <CalenderModal date={date} dateUpdatingFn={updateDate} />}
      {createTaskModal.modalVisibility &&  <CreateTask/>}
      <WeekNavbar/>
      <Button 
        btnDimensions={{width: 4, height: 4}}
        extraStyles={{
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: "3em"
        }}
        backgroundColor='#0094DF'
        icon={<CreateTaskIcon/>}
        onClick={handelOpenCreateTaskModal}
      ></Button>
      <TaskContainer/>
    </div>
  )
}

export default App
