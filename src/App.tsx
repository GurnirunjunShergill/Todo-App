import { useEffect, useState } from "react";
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
import { ListItemButton, Typography } from "@mui/material";

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

    useEffect(()=>{
      const storedTaskList = window.localStorage.getItem('taskList');
      const storedTaskListCompleted = window.localStorage.getItem('taskListCompleted');
      if(storedTaskList)
        setTaskList(JSON.parse(storedTaskList));
      if(storedTaskListCompleted) setTaskListCompleted(JSON.parse(storedTaskListCompleted))
    },[])


  return (
    <div className="task-container">
      <Typography variant="h1">TODO App</Typography>
      <Dialog
        className="dialog-container"
        open={openTaskCreationModal}
        onClose={() => setOpenTaskCreationModal(false)}
        fullWidth
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
                window.localStorage.setItem('taskList', JSON.stringify(updatedTaskList))
                return updatedTaskList;
              });
            },
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h3">Add Task</Typography>
        </DialogTitle>
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
        <DialogActions sx={{ padding: "20px" }}>
          <Button variant="contained" type="submit" size="large">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        className="add-task-button"
        size="large"
        onClick={() => {
          setOpenTaskCreationModal(true);
        }}
        data-testid='add-new-task-button'
      >
        Add New Task
      </Button>

      <Typography
        className="list-title"
        variant="h3"
        sx={{ marginTop: "20px" }}
        data-testid='task-list-heading'
      >
        Tasks
      </Typography>
      {taskList.length > 0 ? (
        <List className='list-container'>
          {taskList?.map((task, index) => {
            return (
              <ListItem
                className="task-item-container"
                key={index}
              >
                <ListItemText>
                  <Typography variant="h4">{task.taskTitle}</Typography>
                </ListItemText>
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
                          window.localStorage.setItem('taskListCompleted', JSON.stringify(updatedTaskListCompleted))
                          return updatedTaskListCompleted;
                        });
                        setTaskList((previousTaskList) => {
                          const updatedTaskList = [...previousTaskList];
                          const filteredTaskList = updatedTaskList.filter(
                            (task) => task !== currentItem
                          )
                          window.localStorage.setItem('taskList', JSON.stringify(filteredTaskList))
                          return filteredTaskList;
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
      ) : (
        <div className="empty-container">
          <Typography>No Tasks Added</Typography>
        </div>
      )}

      <Typography
        className="list-title"
        variant="h3"
        sx={{ marginTop: "20px" }}
        data-testid='completed-task-list-heading'
      >
        Completed Tasks
      </Typography>
      {taskListCompleted.length > 0 ? (
        <List className='list-container'>
          {taskListCompleted?.map((task, index) => {
            return (
              <ListItem className="task-item-container" key={index}>
                <ListItemText>
                  <Typography variant="h4">{task.taskTitle}</Typography>
                </ListItemText>
                <ListItemText sx={{ marginTop: "20px" }}>
                  {task.taskDetails}
                </ListItemText>
                <div className="task-item-button-container">
                  <ListItemButton>
                    <Button
                      variant="contained"
                      onClick={() => {
                        const currentItem = taskListCompleted[index];
                        setTaskList((previousTaskList) => {
                          const updatedTaskList = [...previousTaskList];
                          updatedTaskList.push(currentItem);
                          window.localStorage.setItem('taskList', JSON.stringify(updatedTaskList))
                          return updatedTaskList;
                        });
                        setTaskListCompleted((previousTaskListCompleted) => {
                          const updatedTaskCompletedList = [
                            ...previousTaskListCompleted,
                          ];
                          const filteredCompletedTaskList = updatedTaskCompletedList.filter(
                            (task) => task !== currentItem
                          )
                          window.localStorage.setItem('taskListCompleted', JSON.stringify(filteredCompletedTaskList))
                          return filteredCompletedTaskList;
                        });
                      }}
                    >
                      Reopen Me
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
      ) : (
        <div className="empty-container">
          <Typography>No Tasks Completed</Typography>
        </div>
      )}
    </div>
  );
}

export default App;
