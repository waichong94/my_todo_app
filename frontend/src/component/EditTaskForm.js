import React, {useState} from 'react';

const EditTaskForm = ({updateTask, task}) => {
    const [value, setValue] = useState(task.description);

    const handleSubmit = e => {
        e.preventDefault(); // prevent reload page default function
        updateTask(value, task.id);
        setValue("");
    }
    return ( 
        <div className='TaskListWrapper'>
            <form className='EditTaskForm' onSubmit={handleSubmit}>
                <input type="text" className='task-update-input' placeholder='Update Task' value={value} onChange={(e) => setValue(e.target.value)}></input>
                
                <button type='submit' className='task-update-btn'> Update Task </button>
                    
            </form>
            <hr className='task-line'></hr>
        </div>
    );
}
 
export default EditTaskForm;