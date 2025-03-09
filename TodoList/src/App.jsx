// Completed

// Icons from this site:=> https://react-icons.github.io/react-icons/


import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }

  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)

  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLS()

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLS()

  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLS()
    // console.log(todos)

  }
  const handleChange = (e) => {
    settodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    // console.log(e.target.value)
    let id = e.target.name;
    // console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    // console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    // console.log(newTodos)
    saveToLS()
  }


  return (
    < >
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh] md:w-1/2 ">
        <h1 className='font-bold text-center text-2xl'>iTask-Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">

          <h2 className="text-lg font-bold text-left">Add a Todo</h2>

          <div className="flex">

            <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full bg-white px-5 py-1" />



            <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-violet-800 hover:bg-violet-950 disabled:hover:bg-violet-950 mx-2 rounded-full p-4 py-2 text-sm font-bold text-white ">

              Save
            </button>
          </div>
        </div>

        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

        <h2 className="text-lg font-bold text-left">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between">

              <div className='flex  gap-10'>

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />

                <div className={item.isCompleted ? "line-through" : ""}>{item.todo} </div>
              </div>

              <div className="buttons flex h-full">

                <button onClick={(e) => handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">
                  <FaEdit />
                </button>

                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">
                  <MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App