import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faCircleCheck,faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  const [toDo, setTodo]= useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
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
                <button 
                onClick={updateTask}
                className="btn btn-lg btn-success ml-5">Update</button>
                <button 
                onClick={cancelUpdate}
                className="btn btn-lg btn-danger ">Cancel</button>
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
              <button 
              onClick={addTask}
              className="btn btn-lg btn-success">Add Task</button>
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
