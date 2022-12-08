import axios from 'axios';
import React, { useContext, useState } from 'react'
import ToastContext from '../Context/ToastContext';
export default function MyTodos({ Todo, reload, setReload }) {

    const { toast } = useContext(ToastContext)

    const [isedit, setEdit] = useState(true)

    const [editTask, setEditTask] = useState({
        task: "",
        isCompleted: false
    })

    const [isCompleted, setIsCompleted] = useState()


    const clickDone = (entry) => {
        //console.log(entry.isCompleted)
        setIsCompleted(!entry.isCompleted)
        axios.put(`/todo/edit/${entry._id}`, { isCompleted })
        setTimeout(() => {
            setReload(!reload)
        }, 1500)
    }

    const handleRemove = (entry) => {
        setReload(!reload)
        //console.log(entry._id);
        axios.delete(`/todo/delete/${entry._id}`)
        toast.error("Todo Removed")
        setTimeout(() => {
            setReload(!reload)
        }, 1500)
    }
    const handleEdit = (entry) => {

        setEdit(!isedit)
        setEditTask(entry)
        //console.log(editTask);

    }

    const handleInput = (e) => {
        setEditTask(prev => {
            return {
                ...prev,
                task: e.target.value
            }
        })
        //console.log(e.target.value);
    }



    const handleCancel = () => {
        setEdit(true)
    }
    const handleSave = () => {
        setEdit(true)
        //console.log(editTask);
        if (editTask) {
            const editedTask = {
                task: editTask
                // date: Input.date,
                // time: Input.time
            }
            axios.put(`/todo/editSave/${editTask._id}`, editedTask.task)
            toast.success("Changes Saved")
            setTimeout(() => {
                setReload(!reload)
            }, 500)
        }
    }

    return (
        <div>
            {Todo.length > 0 && <h3> My Todos</h3>}

            {!isedit &&
                <div>
                    <h2 >Edit your todos</h2>
                    <div >
                        <div className='container d-flex'>
                            <input className='form-control' value={editTask.task} onChange={handleInput} />
                            <button className="btn btn-success" onClick={() => { handleSave() }}>Save</button>
                            <button className="btn btn-warning" onClick={() => { handleCancel() }}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            <div style={{ overflow: "auto", height: "65vh" }}>
                {Todo && Todo.map((entry, key) => {
                    //console.log(Todo);
                    return (
                        <div key={key} style={{ zIndex: 0 }} className='container d-flex justify-content-evenly my-2'>
                            <button style={{ backgroundColor: entry.isCompleted ? 'limegreen' : 'yellow' }}
                                onClick={() => { clickDone(entry) }} >
                                {entry.isCompleted ? "Done✔" : "Pending"}
                            </button>
                            <span style={{ textDecoration: entry.isCompleted ? 'line-through' : 'none' }} className='form-control mx-2 fs-5'>{entry.task}</span>
                            <button className="btn btn-warning" disabled={!isedit} onClick={() => { handleEdit(entry) }}>Edit</button>
                            <button className='btn btn-primary btn-danger' disabled={!isedit} onClick={() => { handleRemove(entry) }}>Remove</button>
                        </div>
                    )
                })
                }
            </div>
        </div >
    )
}

