// import './App.css'
import {Routes, Route} from 'react-router-dom'
import Heading from './components/Heading'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { GlobalProvider } from './context/GoblaContext'

function App() {

  return (
    // Los hijos de GlobalProvider, van a poder acceder al contexto
    <GlobalProvider>
      {/* // h-screen alto maximo de la pantalla */}
      <div className="h-screen text-black dark:text-white text-center p-5 md:p-10 bg-orange-50 dark:bg-slate-800">
        {/* h-full, para que abarque todo el ancho disponible */}
        <div className="container mx-auto h-full">
          <Heading />
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
          </Routes>
        </div>
      </div>
    </GlobalProvider>
    
  )
}

export default App