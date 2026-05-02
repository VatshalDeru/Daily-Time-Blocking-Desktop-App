import { useContext, useEffect, useMemo, useRef } from "react";
import Button from "../Button/Button";
import { useState } from "react";
import { ModalContext } from "../../store/Modal/ModalContext";
import DateInput from "./modals/DateInput/DateInput";
// import { DateContext } from "../../store/Date/DateContext";
import IconModal from "./modals/IconModal/IconModal";
import TimeModal from "./modals/TimeModal/TimeModal";
import useClickOutside from "../../hooks/useClickOutside";
import { TaskContext, type CurrTask } from "../../store/Task/TaskContext";
import { formatDate, formatTime} from "../../utils/util";
import { Icon } from "@iconify/react";
import CloseIcon from "../icons/CloseIcon";
import ColourPaletteIcon from "../icons/ColourPaletteIcon";
import CalenderIcon from "../icons/CalenderIcon";
import ClockIcon from "../icons/ClockIcon";

export type TimeWindow = {
  startTime: Date,
  endTime: Date,
}


export default function CreateTask() {
  const { createTaskModal, iconModal, timeModal, taskDateModal } = useContext(ModalContext);
  const { currTask, tasks } = useContext(TaskContext);
  const createTaskRef = useRef<HTMLDivElement>(null)
  const originalTaskCopy = useRef<CurrTask>(currTask);
  // console.log('createTaskModal modalMode: ', createTaskModal.modalMode)
  console.log(createTaskModal.modalMode);
  useEffect(() => {
    if(createTaskModal.modalMode === 'update') {
      console.log('time reset')
      originalTaskCopy.current = {
        ...currTask,
        date: new Date(currTask.date as Date)
      };
    }
  }, [])

  // formats the time to be displayed at the top of the modal
  const getDisplayTime = (date: Date) => {
    const { hours, minutes, period} = formatTime(date)

    return `${hours}:${minutes} ${period}`
  };

  // need to work on cleaning this function up
  // need to pad minutes with 0,
  // this formats the time window that will be displayed at the top of the modal and also in the time input area
  const timeWindow = useMemo(() => {
    if(!currTask || !currTask.date) return;

    const taskEndTime = new Date(currTask.date.getTime() + currTask.duration);
    const formattedStartTime = getDisplayTime(currTask.date);
    const formattedEndTime = getDisplayTime(taskEndTime);

    const DAY_MS = 24*60*60*1000;

    let timeWindowDuration = taskEndTime.getTime() - currTask.date.getTime();
    // ensures the time window stays wrapped in the range of 0 <= timeWindow < 24hrs
    timeWindowDuration = ((timeWindowDuration%DAY_MS) + DAY_MS) % DAY_MS;

    const hours = Math.floor(timeWindowDuration / (1000*60*60));
    const mins = Math.floor(timeWindowDuration / (1000*60) - (hours*60));
    // console.log(hours, mins)
    if (hours!=0) {
      return {
        window:`${formattedStartTime} - ${formattedEndTime}`,
        duration: `(${hours}hr, ${mins}min)`
      };
    } else if (mins === 1 || mins === 0) {
      return {
        window: `${formattedStartTime}`,
        duration: `(1min)`
      }
    } else {
      return {
        window: `${formattedStartTime} - ${formattedEndTime}`, 
        duration: `(${mins}min)`,
      }
    }
  }, [currTask]);

  // useEffect to disable scrolling  when the cursor is inside of the modal
  useEffect(() => {  
      document.body.style.overflow = "hidden";
      
      // const taskTime = Math.floor(currTask.date?.getTime() as number / (1000 * 60));
      // const currTime = Math.floor(new Date().getTime() / (1000 * 60));
      // if(taskTime !== currTime && createTaskModal.modalMode === 'create') {
      //   currTask.setDate(new Date());
      // }

      return () => {
          document.body.style.overflow = "auto";
      };
  }, [currTask]);

  // custom hook to close modal when clicked outside
  useClickOutside({ref:createTaskRef, closeHandler: createTaskModal.hideModal})

  const handleSubmitTask = async () => {
    const submittedTask = {
      icon: currTask.icon,
      colour: currTask.colour,
      date: currTask.date,
      duration: currTask.duration,
      isCompleted: currTask.isCompleted,
      name: currTask.name,
      // timeWindow: currTask.timeWindow
    };

    // check all values of the task object are truthy
    const allValuesTruthy = Object.values(submittedTask).every(
        value => value !== null &&
        value !== undefined &&
        (typeof value !== "string" || value.trim() !== "")
      );

    const taskTimeIsOverLapping = await window.electron.checkTaskTimeOverlaps(submittedTask.date, submittedTask.duration);
    console.log("taskTimeIsOverlapping in CreateTasks near line 103: ", taskTimeIsOverLapping);

    if(!allValuesTruthy || taskTimeIsOverLapping){
      console.log("Invalid fields entered. heres your submitted object: ", submittedTask);
      return;
    }; 

    await window.electron.saveTask(submittedTask);

    console.log(submittedTask);
    tasks.triggerRefresh();
    currTask.clearCurrTask();
    createTaskModal.hideModal();
  }

  const handleUpdateTask = async () => {
    const submittedTask = {
      taskId: currTask.taskId,
      icon: currTask.icon,
      colour: currTask.colour,
      date: currTask.date,
      duration: currTask.duration,
      isCompleted: currTask.isCompleted,
      name: currTask.name,
    };

    const updatedTask = Object.fromEntries((Object.keys(submittedTask) as (keyof CurrTask)[])
    .filter((key: keyof CurrTask) => submittedTask[key] !== originalTaskCopy.current[key])
    .map(key => [key, submittedTask[key]]) 
    ) as Partial<CurrTask>

    console.log({
      ...updatedTask,
      taskId: submittedTask.taskId
    });

    await window.electron.updateTask({
      ...updatedTask,
      taskId: submittedTask.taskId
    });

    tasks.triggerRefresh();
    currTask.clearCurrTask();
    createTaskModal.hideModal();
  }

  const deleteTask = async () => {
    await window.electron.deleteTask(currTask.taskId);

    tasks.triggerRefresh();
    currTask.clearCurrTask();
    createTaskModal.hideModal();
  };

  // console.log(formatDate(currTask.date as Date))
  return (
    <div className="createTaskContainer" ref={createTaskRef}>
      <div className="topSection" style={{backgroundColor: currTask.colour}}>
        <div className="buttonContainer">
          <Button
            icon={<CloseIcon/>}
            backgroundColor="#5F5F5F"
            btnDimensions={{ width: 2.5, height: 2.5 }}
            onClick={createTaskModal.hideModal}
          />
        </div>
        <div className="taskInfoContainer">
          <div className="taskIcon">
            <Icon icon={currTask.icon} width={30} height={30}/>
            <Button
              onClick={iconModal.showModal}
              icon={<ColourPaletteIcon iconColour={currTask.colour}/>}
            ></Button>
          {iconModal.modalVisibility && <IconModal/>}
          </div>
          <div className="taskInfo">
            <div className="taskTime">
              {timeWindow.window + ' ' + timeWindow.duration}
            </div>
            <div className="inputSection">
              <input type="text" placeholder="Task Name" value={currTask.name} onChange={(e) => currTask.setName(e.target.value)}/>
              <button></button>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomSection">
        <div className="taskTimeDateInputContainer">
          <div
            className="dayInputContainer"
            onClick={taskDateModal.showModal}
          >
            <CalenderIcon iconColour={currTask.colour}/>
            <p>{currTask.date ? formatDate(currTask.date as Date) : ''}</p>
          </div>
          {taskDateModal.modalVisibility && <DateInput accentColours={currTask.colour}/>}
          <div className="timeInputContainer" onClick={timeModal.showModal}>
            <ClockIcon iconColour={currTask.colour}/>
            <p>{timeWindow.window}</p>
          </div>
        </div>
        {timeModal.modalVisibility && <TimeModal/>}
        {/* <div className="subTasksNotesContainer">
          <div className="subtaskInput">
            <input type="text" placeholder="Add Subtask" />
          </div>
          <div className="taskNotes">
            <textarea
              className="taskNotes"
              name="notes"
              placeholder="Add notes, meeting links or phone numbers..."
            ></textarea>
          </div>
        </div> */}
        <div className="modifyTaskButtons">
          {createTaskModal.modalMode === 'update' ? <Button
            onClick={deleteTask}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19Z"
                  fill={currTask.colour}
                />
              </svg>
            }
            backgroundColor="#242424"
            extraStyles={{
              border: "1px solid #858585",
            }}
            btnDimensions={{ width: 3, height: 3 }}
          ></Button> : <div></div>}
          <Button 
            onClick={createTaskModal.modalMode === 'create' ? handleSubmitTask : handleUpdateTask}
            backgroundColor={currTask.colour}
            extraStyles={{
              borderRadius: "2em",
              paddingInline: "1em",
              fontWeight: "bold"
            }}
          >{createTaskModal.modalMode === 'create' ? 'Create Task' : 'Update'}</Button>
        </div>
      </div>
    </div>
  );
}
