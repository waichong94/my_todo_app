import React, {useState} from 'react';

const TaskForm = ({addTask}) => {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault(); // prevent reload page default function
        addTask(value);
        setValue("");
    }
    return ( 
        <form className='TaskForm' onSubmit={handleSubmit}>
            <label className='task-label'>+ New Task</label><br></br>
            <input type="text" className='task-input' id='task-input-name'  placeholder='Task Name' value={value} onChange={(e) => setValue(e.target.value)}></input><br></br>
            <button type='submit' className='task-btn'> Add Task </button>
        </form>
    );
}
 
export default TaskForm;