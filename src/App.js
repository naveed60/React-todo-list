import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faCircleCheck,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import  Button  from '@mui/material/Button';
import Navbar  from './components/Navbar';
import {
 
} from "react-router-dom";



import './App.css';

function App() {
  const [toDo, setTodo]= useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log('Saved tasks from localStorage:', savedTasks);
    setTodo(savedTasks);
  }, []);

  // Save tasks to localStorage whenever 'toDo' changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(toDo));
  }, [toDo]);

  // add new task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status:false }
      setTodo([...toDo, newEntry])
      setNewTask('')
    }
  }

  // delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task =>task.id !==id )
    setTodo(newTasks)
  }
  
  // update task
  const updateTask = (id) => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id);
    let updateObject = [...filterRecords, updateData]
    setTodo(updateObject);
    setUpdateData('');
  }

  // mark task completed
  const markDone = (id) => {
    let newTask = toDo.map( task => {
     if(task.id ===id) {
      return ({...task, status: !task.status})
     }
      return task;
    })
     setTodo(newTask);
  }

  // cancel task
  const cancelUpdate = () => {
    setUpdateData('');

  }

  // change task for update
  const changeTask = (e) => {
   let newEntry = {
    id: updateData.id,
    title: e.target.value,
    status: updateData.status ? true : false
   }
   setUpdateData(newEntry);
  }

  return (
    
    <div className="container App">
      <Navbar></Navbar>
      <h1>React JS (TODO List)</h1>
      <br></br>
      {/* {update Task} */}
      {updateData && updateData ? (
        <> 
          
          <div className="row">
            <div className="col">
              <input 
              value={ updateData && updateData.title }
              onChange={ (e) => changeTask(e) }
              className="form-control form-control-lg"
              />
              </div>
              <div className="col-auto">
                <Button  variant="contained" color="success"size="large"
                onClick={updateTask}
                >Update</Button>
                <Button  variant="contained" color="error"size="large"
                onClick={cancelUpdate}
                >Cancel</Button>
              </div>
            </div>
        
          <br></br>
        </>
      ) : (
       <>
          {/* {ADD TASK Form} */}
          <div className="row mb-4">
            <div className="col">
              <input placeholder="Add New task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="form-control form-control-lg "
              />
            </div>
            <div className="col-auto">
              <Button  variant="contained" color="info"size="large"
              onClick={addTask}
              >Add Task</Button>
            </div>
          </div>
        </>
      )}
      
     


      {/* {Display Todos} */}
      {toDo && toDo.length ? '' : 'No Tasks...'}
      {toDo && toDo
      .sort((a,b)=> a.id > b.id ? 1 : -1)
      .map((task,index) => {
        return(
          <React.Fragment key={task.id}>
            <div className="col taskBg">
             <div className={task.status ? 'done' : '' }>
                
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.title}</span>
              </div>
              <div className="iconsWrap">
                <span title="Completed / Not Completed"
                onClick={ (e) => markDone(task.id) }
                >
                  <FontAwesomeIcon icon={faCircleCheck}/>
                </span>
                {task.status ? null : (
                  <span title="Eidt"
                   onClick={() => setUpdateData ({
                    id: task.id, 
                    title: task.title,
                    status: task.status ? true : false
                  })}
                  >
                    <FontAwesomeIcon icon={faPen}/>
                  </span>
                )}
                
                  <span 
                  onClick={() => deleteTask(task.id)}
                  title="Delete">
                    <FontAwesomeIcon icon={faTrashCan}/>
                  </span>
              </div>
            </div>
           
          </React.Fragment>


        )
       })
      }
       
    </div>
    
  );
}

export default App;
