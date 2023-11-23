import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faCircleCheck,faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  const [toDo, setTodo]= useState([
    {"id":1, "title": "Task 1", "status":false},
    {"id":2, "title": "Task 2", "status":false}
  ]);
  const [newTask, setNewTask] = useState('');
  const [updatData, setUpdateData] = useState('');
  // add task
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
    //
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

  // add task
  const cancelUpdate = () => {
    //
  }

  // change task for update
  const changeTask = (e) => {
    //
  }

  return (
    <div className="container App">
      <h1>ToDo List</h1>
      <br></br>
      {/* {update Task} */}
      <div className="row">
        <div className="col">
          <input
           className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-lg btn-success mr-20">Update</button>
          <button className="btn btn-lg btn-warning">Cancel</button>
        </div>
      </div>
      <br></br>
      {/* {ADD TASK} */}
      <div className="row">
        <div className="col">
          <input 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button 
          onClick={addTask}
          className="btn btn-lg btn-success">Add</button>
        </div>
      </div>


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
                <span title="Eidt">
                  <FontAwesomeIcon icon={faPen}/>
                </span>
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
