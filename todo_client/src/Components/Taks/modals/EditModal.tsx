import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import useContextWrapper from '../../../hooks/useContextWrapper';
import { AuthContext } from '../../../Context/authContext';
import { Save } from '@mui/icons-material';
import {
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";
import { Api } from '../../../Api/api';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Task {
  title: string;
  description: string;
  userId: string;
}

export default function EditModal({task}: any) {
  const [editTask, setEditTask] = useState<Task>({
    title: task.title,
    description: task.description,
    userId: task.userId,
    completed: task.completed,
  } as Task)

  const { setIsOpen, isOpen, setLoading, authData} = useContextWrapper(AuthContext, {
    contextName: 'AuthContext',
    providerName: 'AuthProvider',
  })

  const handleClose = () => setIsOpen(!isOpen);

  const handleEdit = async () => {
    const response = await fetch(`${Api}/task/edit/${task.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authData?.token}`
      },
      body: JSON.stringify(editTask)
    })
          
    if (response.status === 200) {
      handleClose()
      setLoading(true)
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
          <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <TextField
              margin="normal"
              fullWidth
              id="title"
              label="title"
              name="title"
              autoFocus
              value={editTask.title}
              onChange={(e) => setEditTask(
                { ...editTask, title: e.target.value }
              )}
            />

            <TextField
              margin="normal"
              fullWidth
              id="description"
              name="description"
              label="description"
              value={editTask.description}
              onChange={(e) => setEditTask({
                ...editTask, description: e.target.value,
              })}
            />

            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleEdit}>
              <Save />
              Save
            </Button>
          </Box>
        </Box>
      </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}