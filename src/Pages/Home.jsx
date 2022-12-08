import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthorizationContext from '../Context/AuthorizationContext'
import MyTodos from '../Components/MyTodos'
import axios from 'axios'
import ToastContext from '../Context/ToastContext'

export default function Home() {


  const { user } = useContext(AuthorizationContext)
  const { toast } = useContext(ToastContext)

  // //console.log(user);

  const navigate = useNavigate()

  const [Todo, setTodo] = useState(undefined)



  const [reload, setReload] = useState(false)

  const [newTask, setNewtask] = useState({
    task: "",
    iscompleted: false,
    user: user
  })

  const handleInput = (e) => {
    const { name, value } = e.target

    setNewtask({ ...newTask, [name]: value })
  }


  useEffect(() => {
    // console.log("reload");
    !user && navigate("/login", { replace: true })

    MyTodos()
    async function MyTodos() {

      const res = await axios.get(`/todo/getTodo/${user._id}`)

      // const check = await res.data.res
      setTodo(await res.data.res)
      // //console.log(Todo);
      // console.log(res.data.res);

    }
  }, [reload])


  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (newTask.task === "") {
      toast.warning("Empty values not allowed")
      return
    }
    setNewtask({ ...newTask, task: "" })
    try {
      //console.log(newTask);t
      const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
      const res = await axios.post(`/todo/createTodo`, newTask, { headers })

      toast.success("Todo Created")
      // const result = await res.data
      //console.log(result);
      setReload(!reload)

    } catch (error) {

      //console.log(error);
    }
  }

  return (
    <div className='mt-2'>
      {user && <h1>Hello {user.username}</h1>}
      <div >
        <form>
          <div className="form-floating mb-3 d-flex">
            <input onChange={handleInput} value={newTask.task} name="task" type="text" className="form-control mx-2" id="floatingInput" placeholder="Enter Your Task" />
            <label htmlFor="floatingInput">Enter Your Task</label>
            <button onClick={handleAddTodo} className="btn btn-primary">Add Task</button>
          </div>
        </form>
      </div>

      {Todo !== undefined && <div>
        <MyTodos Todo={Todo} reload={reload} setReload={setReload} />
      </div>}

      {Todo === undefined &&
        <>
          <h2>Ohhh!!!! Seems like you don't have any todos....</h2>
          <h2>Add Some Now !!!!!</h2>
        </>
      }
    </div>
  )
}
