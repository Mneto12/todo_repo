import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../Config/tableListConfig';
import { Api } from '../Api/api';
import { AuthContext } from '../Context/authContext';
import useContextWrapper from '../hooks/useContextWrapper';
import Loader from '../Components/Loader/loader';
import '../Styles/Tasks.css'
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';

export default function TasksCompleted() {
  const [tasks, setTasks] = useState([])
  const { authData, setLoading, loading } = useContextWrapper(AuthContext, {
    contextName: 'AuthContext',
    providerName: 'AuthProvider',
  })

  const handleChecked = async (value: boolean, id: string) => {
    const response = await fetch(`${Api}/task/edit/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData?.token}`
      },
      body: JSON.stringify({
        completed: value
      })
    })

    if (response.status === 200 && !value) {
      setLoading(true)
    }
  }

  const fetchTaskCompleted = async () => {
      let completed: boolean = true

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
        setTasks(data)
        setLoading(false)
      }

      if (response.status === 500) {
        alert('Internal Server Error')
        setLoading(false)
      }
  }

  useEffect(() => {
    fetchTaskCompleted()
  }, [loading])

  return (
    <>
     { !loading ? (
      <Box display={'flex'} justifyContent="center">
        <TableContainer sx={{ maxWidth: 900 }} component={Paper}>
          <Table sx={{ maxWidth: 900 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.length > 0 && tasks.map((task: any) => (
                <StyledTableRow key={task.id}>
                    {task.title}    
                    <StyledTableCell align="center">
                        Complete
                        <Checkbox 
                        checked={task.completed}
                        onChange={(e) => handleChecked(e.target.checked, task.id)}
                        />
                    </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      ) : <Loader />}
    </>
  );
}