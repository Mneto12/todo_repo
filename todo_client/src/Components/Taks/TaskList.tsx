import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../../Config/tableListConfig';
import { Api } from '../../Api/api';
import { AuthContext } from '../../Context/authContext';
import useContextWrapper from '../../hooks/useContextWrapper';
import Loader from '../Loader/loader';
import '../../Styles/Tasks.css'
import { Check, Delete, Edit } from '@mui/icons-material';
import EditModal from './modals/EditModal';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function TaskList({tasks}: any) {
  const { authData, setLoading, loading, setIsOpen, isOpen } = useContextWrapper(AuthContext, {
    contextName: 'AuthContext',
    providerName: 'AuthProvider',
  })

  const [IdTask, setIdTask] = useState('')

  const handleDelete = async (id: any) => {

    const response = await fetch(`${Api}/task/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData?.token}`
      }
    })

    if (response.status === 204) {
      setLoading(true)
    }
  }

  const handleEdit = (id: any) => {
    tasks.map((task: any) => {
      if (task.id === id) {
        setIdTask(task.id)
      }
    })
    setIsOpen(!isOpen)
  }

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

    if (response.status === 200 && value) {
      setLoading(true)
    }
  }

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
                    <StyledTableCell align="right">
                        <Button variant="contained" onClick={() => handleEdit(task.id)}>
                          <Edit />
                          Edit
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        <Button variant="contained" onClick={() => handleDelete(task.id)}>
                          <Delete />
                          Delete
                        </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        Complete
                        <Checkbox 
                        onChange={(e) => handleChecked(e.target.checked, task.id)}
                        />
                    </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {
          tasks.map((task: any) => {
            if (task.id === IdTask) {
              return <EditModal task={task}/>
            }
          })
        }
      </Box>
      ) : <Loader />}
    </>
  );
}