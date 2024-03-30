import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Task = ({task, toggleComplete, deleteTask, editTask}) => {
    return ( 
        <div className='TaskListWrapper'>
            <div className="container">
                <div className='check-text'>
                    <input type="checkbox" className="list-checkbox" checked={task.is_completed} onChange={() => toggleComplete(task.id, task.is_completed)} />  
                    <p onClick={() =>toggleComplete(task.id, task.is_completed)} className={`${task.is_completed ? 'completed' : ""} list-text`} >{task.description}</p>
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTask(task.id)} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(task.id) } />
                </div>    
            </div>
            <hr className='task-line'></hr>
        </div>
        
    );
}
 
export default Task;