import { Link } from "react-router-dom"
import {IoMdAdd} from 'react-icons/io'
import { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
const Heading = () => {

    const initialState = () => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches || document.querySelector('#root').classList.contains('dark')){
            return "dark";
        }
        return "light";   
    }

    const [theme,setTheme] = useState(initialState);

    function handleChangeTheme(){
        setTheme((themes) => themes === "dark" ? "light" : "dark")
    }

    useEffect(() => {
        if(theme === "dark"){
            document.querySelector('#root').classList.add('dark')
        }else{
            document.querySelector('#root').classList.remove('dark')
        }
    }, [theme])

    return (
        <div>
            <div className="flex items-center mb-10">
                <Link to="/">
                    <h5 className="text-black dark:text-gray-100 font-bold text-2xl">Task List</h5>
                </Link>
                <div className="flex-grow text-right">
                    <button 
                        className="bg-white text-black dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white font-semibold py-2 px-4 rounded inline-flex items-center mr-4"
                        onClick={handleChangeTheme}
                    >
                        {(theme === 'dark') ? 
                            (<>
                                <FaRegMoon />
                                <span className="pl-2">Dark mode</span>
                            </>) :
                            (<>
                                <MdLightMode />
                                <span className="pl-2">Light mode</span>
                            </>)
                        }
                    </button>
                    <Link to="/add">
                        <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                            <IoMdAdd/>
                            <span className="pl-2">Add Task</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Heading