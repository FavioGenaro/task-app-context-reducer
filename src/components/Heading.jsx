import { Link } from "react-router-dom"
import {IoMdAdd} from 'react-icons/io'

const Heading = () => {

    return (
        <div>
            <div className="flex items-center mb-10">
                <Link to="/">
                    <h5 className="text-gray-100 font-bold text-2xl">Task List</h5>
                </Link>
                <div className="flex-grow text-right">
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