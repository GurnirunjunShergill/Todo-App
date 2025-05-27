import { useState } from "react";
import "./App.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider, ListItemButton, Typography } from "@mui/material";

export interface TaskType {
  taskTitle: string;
  taskDetails: string;
}

function App() {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [taskListCompleted, setTaskListCompleted] = useState<TaskType[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDetails, setTaskDetails] = useState<string>("");
  const [openTaskCreationModal, setOpenTaskCreationModal] =
    useState<boolean>(false);

  return (
    <div className="task-container">
      <Typography variant='h1' sx={{margin: '0 auto 50px auto'}}>TODO App</Typography>
      <Dialog
        open={openTaskCreationModal}
        onClose={() => setOpenTaskCreationModal(false)}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setTaskList((previousTaskList) => {
                const updatedTaskList = [...previousTaskList];
                const newTask = {
                  taskTitle: taskTitle,
                  taskDetails: taskDetails,
                };
                updatedTaskList.push(newTask);
                setOpenTaskCreationModal(false);
                return updatedTaskList;
              });
            },
          },
        }}
      >
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent style={{ paddingTop: "20px" }}>
          <TextField
            required
            label="Task Title"
            margin="dense"
            onChange={(event) => setTaskTitle(event.target.value)}
            fullWidth
          />
          <TextField
            required
            label="Task Details"
            multiline
            rows={4}
            variant="filled"
            fullWidth
            margin="dense"
            onChange={(event) => setTaskDetails(event.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{padding: '20px'}}>
          <Button variant="contained" type="submit">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        sx={{width: '15%', margin: 'auto'}}
        size="large"
        onClick={() => {
          setOpenTaskCreationModal(true);
        }}
      >
        Add New Task
      </Button>

      <Typography variant='h3' sx={{marginTop: '20px'}}>Tasks</Typography>
      {taskList.length > 0 ? (
  <List >
        {taskList?.map((task, index) => {
          return (
            <ListItem className="task-item-container" key={index} {...(taskList?.length > 0 && {sx:{borderBottom: 'solid 4px #313638', marginTop: '20px'} })}>
              <ListItemText><Typography variant='h4'>{task.taskTitle}</Typography></ListItemText>
              <ListItemText>{task.taskDetails}</ListItemText>
              <div className="task-item-button-container">
                <ListItemButton>
                  <Button
                    variant="contained"
                    onClick={() => {
                      const currentItem = taskList[index];
                      setTaskListCompleted((previousTaskListCompleted) => {
                        const updatedTaskListCompleted = [
                          ...previousTaskListCompleted,
                        ];
                        updatedTaskListCompleted.push(currentItem);
                        return updatedTaskListCompleted;
                      });
                      setTaskList((previousTaskList) => {
                        const updatedTaskList = [...previousTaskList];
                        return updatedTaskList.filter(
                          (task) => task !== currentItem
                        );
                      });
                    }}
                  >
                    Complete
                  </Button>
                </ListItemButton>
                <ListItemButton>
                  <Button
                    onClick={() => {
                      setTaskList((previousTaskList) => {
                        const updatedTaskList = [...previousTaskList];
                        return updatedTaskList.filter(
                          (task) => task !== previousTaskList[index]
                        );
                      });
                    }}
                  >
                    Delete
                  </Button>
                </ListItemButton>
              </div>
            </ListItem>
          );
        })}
      </List>
      )
    :(
      <div className="empty-container"><Typography>No Tasks Added</Typography></div>
    )}
    
      <Typography variant='h3' sx={{marginTop: '20px'}}>Completed Tasks</Typography>
      {taskListCompleted.length > 0 ? 
      (
 <List>
        {taskListCompleted?.map((task, index) => {
          return (
            <ListItem className="task-item-container" key={index}>
              <ListItemText><Typography variant='h4'>{task.taskTitle}</Typography></ListItemText>
              <ListItemText sx={{marginTop: '20px'}}>{task.taskDetails}</ListItemText>
              <div className="task-item-button-container">
                <ListItemButton>
                  <Button
                    variant="contained"
                    onClick={() => {
                      const currentItem = taskListCompleted[index];
                      setTaskList((previousTaskList) => {
                        const updatedTaskList = [...previousTaskList];
                        updatedTaskList.push(currentItem);
                        return updatedTaskList;
                      });
                      setTaskListCompleted((previousTaskListCompleted) => {
                        const updatedTaskCompletedList = [
                          ...previousTaskListCompleted,
                        ];
                        return updatedTaskCompletedList.filter(
                          (task) => task !== currentItem
                        );
                      });
                    }}
                  >
                    Add Back to Task List
                  </Button>
                </ListItemButton>
                <ListItemButton>
                  <Button
                    onClick={() => {
                      setTaskListCompleted((previousTaskListCompleted) => {
                        const updatedTaskCompletedList = [
                          ...previousTaskListCompleted,
                        ];
                        return updatedTaskCompletedList.filter(
                          (task) => task !== previousTaskListCompleted[index]
                        );
                      });
                    }}
                  >
                    Delete
                  </Button>
                </ListItemButton>
              </div>
            </ListItem>
          );
        })}
      </List>
      ):
      (
        <div className="empty-container"><Typography>No Tasks Completed</Typography></div>
      )}
     
    </div>
  );
}

export default App;
