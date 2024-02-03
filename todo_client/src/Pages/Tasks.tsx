import { useEffect } from "react"
import AddTasks from "../Components/Taks/AddTask"
import { Api } from "../Api/api"
import useContextWrapper from "../hooks/useContextWrapper"
import { AuthContext } from "../Context/authContext"
import TaskList from "../Components/Taks/TaskList"

function Tasks() {
    // const [tasks, setTasks] = useState([])

    const { authData, setTask, task, loading, setLoading } = useContextWrapper(AuthContext, {
      contextName: 'AuthContext',
      providerName: 'AuthProvider',
    })

    const fecthTask = async () => {
      let completed: boolean = false
      const response = await fetch(`${Api}/task/getTasks/${completed}/${authData?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData?.token}`
        }
      })
      const data = await response.json()
      console.log(data)

      if (response.status === 200) {
        setTask(data)
        setLoading(false)
      }

      if (response.status === 500) {
        alert('Internal Server Error')
        setLoading(false)
      }
    }

    useEffect(() => {
      fecthTask()
    }, [loading])

    return (
      <>
        <AddTasks />
        <TaskList tasks={task}/>
      </>
    )
  }
  
export default Tasks