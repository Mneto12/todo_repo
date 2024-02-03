import { Routes, Route } from "react-router-dom"
import Tasks from "./Pages/Tasks"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import PrivateRoutes from "./Utils/privateRoutes"
import useContextWrapper from "./hooks/useContextWrapper"
import { AuthContext } from "./Context/authContext"
import NavBar from "./Components/navBar"
import TasksCompleted from "./Pages/CompletedTasks"

function App() {
  const { authData } = useContextWrapper(AuthContext, {
    contextName: 'AuthContext',
    providerName: 'AuthProvider',
  })

  return (
    <>
      { authData?.token && <NavBar /> }
      <Routes>
        <Route>
          // Public Routes
          <Route path="auth" element={<Login />} />
          <Route path="auth/register" element={<Register />} />

          // Private Routes
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Tasks />} />
            <Route path="/task/completed" element={<TasksCompleted />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}
export default App