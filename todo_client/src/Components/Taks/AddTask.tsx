import { Button, TextField } from "@mui/material"
import '../../Styles/Tasks.css'
import { Add } from "@mui/icons-material"
import {Container, Box, Grid, CssBaseline} from "@mui/material"
import { useState } from "react"
import { Api } from "../../Api/api"
import { AuthContext } from "../../Context/authContext"
import useContextWrapper from "../../hooks/useContextWrapper"

interface Task {
  title: string;
  description: string;
  userId: string;
}

function AddTasks() {
  const [task, setTask] = useState<Task>({} as Task)

  const { authData, setLoading } = useContextWrapper(AuthContext, {
    contextName: 'AuthContext',
    providerName: 'AuthProvider',
  })
  
  const handleTask = async () => {
    try {
      const response = await fetch(`${Api}/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authData.token}`
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          userId: authData.id,
        }),
      });
      
      if (response.status === 201) {
        setLoading(true)
      }

    } catch (error) {
      console.error(error);
    } finally {
      setTask({ title: "", description: "", userId: "" });
    }
  }
  
    return (
      <>
         <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    autoFocus
                    value={task.title}
                    onChange={(e) => {
                      setTask({ ...task, title: e.target.value });
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    value={task.description}
                    onChange={(e) => {
                      setTask({ ...task, description: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                startIcon={<Add />}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleTask}
              >
                Add Task
              </Button>

            </Box>
          </Box>
        </Container>
      </>
    )
  }
  
export default AddTasks