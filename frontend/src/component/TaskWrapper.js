import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import EditTaskForm from './EditTaskForm';
import { doPost } from '../utils'; 
import App from '../App';

const TaskWrapper = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [addTaskFlag, setAddTaskFlag] = useState(false);
    const [numerator, setNume] = useState(0);
    const [latest, setLatest] = useState([]);
    const [degree, setDegree] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            let params = {
                search: search,
            };
            let response = await doPost("/list", params);
            if(typeof response === 'undefined'){
                console.log("Network Error!");
                return;
            }
            if(!response.status){
                console.log(response);
                return;
            }
            setTasks(response.data.list);
            setNume(response.data.completedCount);
            setLatest(response.data.latestRecord);

            let completedDegree = response.data.list.length === 0 ? 0 : response.data.completedCount/response.data.list.length * 360; 
            setDegree(completedDegree);
        };
        fetchData()
    }, []);
    
    const addTask = async task => {
        let params = {
            description: task,
        }
        let response = await doPost('/add', params);
        if(!response.status){
            console.log(response);
            alert(response)
            return;
        }
        setLatest(response.data.latestRecord);
        setTasks([...tasks, {id: response.data.id, description: response.data.description}]);
        setAddTaskFlag(!addTaskFlag);
    }
    const toggleComplete = async (id, completed) => {
        let params = {
            id: id,
            is_completed: !completed,
        }
        let response = await doPost('/set-complete', params);
        if(!response.status){
            alert(response.msg)
            return;
        }
        setLatest(response.data.latestRecord);
        setNume(response.data.completedCount);
        setTasks(tasks.map(task => task.id === id ? {...task, is_completed: response.data.is_completed} : task))
        let completedDegree = tasks.length === 0 ? 0 : response.data.completedCount/tasks.length * 360; 
        setDegree(completedDegree);
    }
    const deleteTask =async id => {
        let params = {
            id: id,
        }
        let response = await doPost('/delete', params);
        if(!response.status){
            alert(response.msg)
            return;
        }

        setLatest(response.data.latestRecord);
        setTasks(tasks.filter(task => task.id !== response.data.id))
    }
    const editTask = id => {
        setTasks(tasks.map(task => task.id === id ? {...task, isEditing: !task.isEditing} : task))
    }
    const updateTask = async (task, id) => {
        let params = {
            id: id,
            description: task,
        }
        let response = await doPost('/update', params);
        setTasks(tasks.map(task => task.id === id ? {...task, description:response.data.description, isEditing : !task.isEditing} : task))
        setLatest(response.data.latestRecord);
    }

    if(localStorage.getItem('uid') === null) {
        return (<App />)
    }
    else if(addTaskFlag) {
        return (<div className='AddTask'><TaskForm addTask={addTask}/></div>)
    }
    else if(tasks.length === 0) {
        return (
            <div className='NoTask'>
                <label className='no-task-label'>You Have No Task</label>
                <button type='submit' className='new-task-btn' onClick={(e) => setAddTaskFlag(!addTaskFlag)}>+ New Task</button>
            </div>
        )
    }else{
        return ( 
            <div className='TaskWrapper'>
                <div className='TaskCard'>
                    <div className='TaskFraction'>
                        <label className='task-fraction-label'>Task Completed</label>
                        <div className='fraction'>
                            <p className='numerator'>{numerator}</p>
                            <p className='denominator'>/ {tasks.length}</p>
                        </div>
                    </div>
                    <div className='TaskLatest'>
                        <label className='task-latest-label'>Latest Created Task</label>
                        <div className='TaskLatestList'>
                            {latest.map((task) => (
                                <li className={`${task.is_completed ? 'completed' : ""} latest-li `} key={task.id}>{task.description}</li>
                            )) }
                        </div>
                    </div>
                    <div className='TaskPie'>
                        <div className="piechart" style={{background: `conic-gradient(#5285EC ${degree}deg, #E8ECEC 0 ${360-degree}deg)`}}>
                        </div>
                        <ul className="legend" style={{color: "none"}}>
                            <li className="legend-item">
                                <span className="legend-text">Completed</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='TaskSearchAdd'>
                    <label className='task-list'>Tasks</label>
                    <div>
                        <input type="text" className='task-search' placeholder='Search by task name' search={search} onChange={(e) => setSearch(e.target.value)}></input>
                        <button type='submit' className='add-task-btn' onClick={(e) => setAddTaskFlag(!addTaskFlag)}>+ New Task</button>
                    </div>
                </div>
                <div className='TaskList'>

                    {tasks.map((task) => (
                        task.isEditing ? (
                            <EditTaskForm updateTask={updateTask} task={task}/>
                        ) : (
                            task.description.includes(search) ? <Task task={task} key={task.id} toggleComplete={toggleComplete} deleteTask={deleteTask} editTask={editTask}/> : ""
                        )
                    )) }
                        
                </div>
            </div>
        );
    }
}
 
export default TaskWrapper;