
// TODO: Agregar persistencia en LocalStorage
// Reducer
export default function appReducer(state, action) {
    switch (action.type) {
        case "ADD_TASK":
            // console.log(state);
            const tasks1 = {
                // ...state,
                tasks: [...state.tasks, action.payload],
            }
            // localStorage.setItem('tasks',JSON.stringify(tasks1))
            // console.log(tasks1);
            return tasks1;
        case "UPDATE_TASK": {
            const updatedTask = action.payload;
    
            const updatedTasks = state.tasks.map((task) => {
                if (task.id === updatedTask.id) {
                    updatedTask.done = task.done;
                    return updatedTask;
                }
                return task;
            });

            const tasks2 = {
                // ...state,
                tasks: updatedTasks,
            }
            // localStorage.setItem('tasks',JSON.stringify(tasks2))

            return tasks2;
        }
        case "DELETE_TASK":
            // el action.payload es el id de la tarea a eliminar
            const tasks3 = {
                // ...state,
                // solo nos quedamos con los que no tiene el id igual
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            }
            // localStorage.setItem('tasks',JSON.stringify(tasks3));
            return tasks3;
        case "TOGGLE_TASK_DONE":
            const updatedTasks = state.tasks.map((task) => {
                // solo cuando encuentre el task, el cambia el done
                if (task.id === action.payload) {
                    return { ...task, done: !task.done };
                }
                // sino retorna la tarea, sin cambios
                return task;
            });
            
            const tasks4 = {
                // ...state,
                tasks: updatedTasks,
            }
            // localStorage.setItem('tasks',JSON.stringify(tasks4))
            return tasks4;
        default:
            return state;
    }
}