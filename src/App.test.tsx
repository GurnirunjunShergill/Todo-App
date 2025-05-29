import { render, screen } from '@testing-library/react';
import App from "./App";

test('Ensure page loads as expected', () =>{
    // render app
    render(<App/>)

    // setup
    const addNewTaskButton = screen.getByTestId('add-new-task-button');
    const taskHeadingText = screen.getByTestId('task-list-heading');
    const completedTaskHeadingText = screen.getByTestId('completed-task-list-heading');

    expect(screen.getByText(/TODO App/i)).toBeInTheDocument();

    expect(addNewTaskButton).toBeVisible();
    expect(addNewTaskButton).toHaveTextContent(/Add New Task/i);

    expect(taskHeadingText).toBeVisible();
    expect(taskHeadingText).toHaveTextContent(/Tasks/i);

    expect(completedTaskHeadingText).toBeVisible();
    expect(completedTaskHeadingText).toHaveTextContent(/Completed Tasks/i);

})