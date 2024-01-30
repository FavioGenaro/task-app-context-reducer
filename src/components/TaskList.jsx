// el GlobalContext tiene nuestro contexto y con useContext accedemos al contexto
import {useContext} from 'react'
import {GlobalContext} from '../context/GoblaContext'
import { Link } from 'react-router-dom'
import emptyList from '../assets/list-empty.svg'
import { MdDelete,MdEdit } from "react-icons/md";

const TaskList = () => {

    const { tasks, deleteTask, toggleTaskDone } = useContext(GlobalContext)

    // console.log(tasks)
    return (
        <div className='flex justify-center w-full'>
            <div className="w-11/12 lg:w-6/12">
                {
                    (tasks.length === 0) ? 
                    (<div>
                        <p className='text-gray-100 opacity-50 font-bold text-2xl mb-5'>There aren't Tasks</p>
                        <div className="imge md:w-96 m-auto">
                            <img src={emptyList} alt="Empty List" className='opacity-50'/>
                        </div>
                    </div>) :
                    tasks.map((task)=> (
                        <div
                            className={`bg-slate-50 text-black dark:bg-gray-900 px-5 py-5 md:px-10 md:py-5 rounded-lg dark:text-white shadow-2xl mb-4 flex flex-col ${task.done && "bg-opacity-40"}`}
                            key={task.id}
                        >
                            <div className="text-left flex">
                                <div className={`${task.done && "opacity-50"}`}>
                                    <h1 className="text-2xl uppercase ">{task.title}</h1>
                                    <h6 className="text-gray-500">{task.id}</h6>
                                    <p>{task.description}</p>
                                </div>
                                <button
                                    className="bg-purple-600 hover:bg-purple-500 py-1 px-3 mt-2 h-10 ml-auto text-white "
                                    onClick={() => toggleTaskDone(task.id)}
                                >
                                    {task.done ? "Undone" : "Done"}
                                </button>
                            </div>
                            <div className='w-full flex items-center justify-between mt-4'>
                            
                                <Link
                                    to={`/edit/${task.id}`}
                                    className='w-auto'
                                >
                                    <button className={`bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 flex items-center gap-4 ${task.done && "opacity-50"}`} disabled={task.done && "disabled"}>
                                        <MdEdit />
                                        <span>Edit</span>
                                    </button>
                                </Link>
                                
    
                                <button
                                    className="bg-red-600 hover:bg-red-500 py-2 px-4 flex items-center gap-4 text-white"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    <MdDelete/>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default TaskList