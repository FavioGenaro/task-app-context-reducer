import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GoblaContext";
import { useNavigate, useParams } from "react-router-dom";


const TaskForm = () => {
    const navigate = useNavigate(); // navegar
    const params = useParams(); // retorna los parámetro de la ruta 


    // nueva tarea
    const [task, setTask] = useState({
        id: "",
        title: "",
        description: "",
    });
    // console.log(task)
    const { addTask, tasks, updateTask } = useContext(GlobalContext); //  updateTask

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setTask({
            ...task,
            // entre cochetes para que tome e.target.name como propiedad del objeto
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.id) { // si no hay id, entonces es nuevo y se añade
            addTask(task);
        } else {
            updateTask(task);
        }
        // recetea
        setTask({
            title: "",
            description: "",
        })
        navigate("/");
    }

    useEffect(() => {

        if(!params.id){ // por si cambiamos a /add estando en /edit/:id
            // console.log('limpiar')
            setTask({
                id: "",
                title: "",
                description: "",
            })
        }

        // params.id contiene el id de la tarea
        const taskFound = tasks.find((task) => task.id === params.id);
        if (taskFound) {
            // se asigna los valores
            setTask({
                id: taskFound.id,
                title: taskFound.title,
                description: taskFound.description,
            });
        }
        // console.log(params.id)

        // cada vez que el params.id cambia, que practicamente es innecesario, porque se recarga la página
        // pero cuando este en /add queremos que no se ejecute el effect, por eso debemos colocar params.id
        // Al crear el form o el useEffect, nos basamos en las tareas, asi que tmb colocamos tasks, nos quita una advertencia de react
    }, [params.id, tasks]);

    return (
        <div className="flex justify-center items-center h-3/4">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border-2 border-stone-100 dark:bg-gray-900 p-10 dark:border-0">
                {/* titulo */}
                <h2 className="text-3xl mb-7">
                    {task.id ? "Update " : "Create "}A Task
                </h2>
                {/* titles */}
                <div className="mb-5">
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Write a title"
                        className="box-border py-3 px-4 focus:outline-none dark:focus:text-gray-100 dark:bg-gray-700 dark:border-gray-700 w-full border border-stone-200 bg-white"
                        autoFocus
                    />
                </div>
                {/* Description */}
                <div className="mb-5">
                    <textarea
                        value={task.description}
                        name="description"
                        rows="2"
                        placeholder="write a description"
                        onChange={handleChange}
                        className="box-border py-3 px-4 focus:outline-none dark:focus:text-gray-100 dark:bg-gray-700 dark:border-gray-700 w-full border border-stone-200 bg-white"
                    ></textarea>
                </div>
                <button className="bg-green-600 w-full hover:bg-green-500 py-2 px-4 mt-5 text-white">
                        {task.id ? "Update Task" : "Create Task"}
                    </button>
            </form>
        </div>
    )
}

export default TaskForm