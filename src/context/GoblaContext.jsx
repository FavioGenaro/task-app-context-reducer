import {createContext, useEffect, useReducer, useState} from 'react'
import appReducer from './AppReducer'
import { v4 } from "uuid";

const initialState = {
    tasks:[
        // {
        //     id: '1',
        //     title: 'Title 1',
        //     description: 'Some description',
        //     done: false
        // },
        // {
        //     id: '2',
        //     title: 'Title 2',
        //     description: 'Some description',
        //     done: false
        // }
    ]
}

const init = () =>{

    // aqui cada vez que se recarga la pagina, debemos que recuperar los TODOs de localStorage
    // convierte al JSON el string retornado de localStorage; si retorna null, retorna el arreglo vacio.
    // inicialmente tendrá el arreglo vacio, cada vez que agregamos se añaden al arreglo.
    return JSON.parse(localStorage.getItem('tasks')) || {tasks:[]};
}

// dentro del createContext debemos definir el estado(variable que se compartirá)
export const GlobalContext = createContext(initialState);
// Es como crear el useState, sin importar el archivo, se podrá acceder a este estado, 
// que es un objeto con un arreglo de tareas


// Este es un componente que usamos para contener todos los elementos
// estos elementos pueden acceder al contexto
// guarda los hijos dentro de Provider
export const GlobalProvider = ({children}) => {

    // reducer, es un conjunto de condicionales
    // init, funcion de inicialización
    // dispatch es la funcion que actualiza el estado, dispadra el appReducer
    const [state, dispatch] = useReducer(appReducer, initialState, init);
    // console.log(state)
    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(state));
    },[state])

    // Creamos funciones que usaremos para modificar las tareas
    // Estas funciones las pasamos al value del provider
    const addTask = (task) => {
        // console.log(task)
        dispatch({
            type: 'ADD_TASK',
            // le añadimos un id único
            payload: { ...task, id: v4(), done: false },
        })
    }

    function updateTask(updatedTask) {
        dispatch({
            type: "UPDATE_TASK",
            payload: updatedTask,
        });
    }
    
    function deleteTask(id) {
        dispatch({
            type: "DELETE_TASK",
            payload: id,
        });
    }
    
    function toggleTaskDone(id) {
        dispatch({
            type: "TOGGLE_TASK_DONE",
            payload: id,
        });
    }

    return (
        // value define el contexto que vamos a compartir
        <GlobalContext.Provider value={{
            tasks: state.tasks, 
            addTask,  
            updateTask,
            deleteTask,
            toggleTaskDone
        }}>
            {children}
        </GlobalContext.Provider>
    )
}