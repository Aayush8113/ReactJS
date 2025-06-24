import { useState, useEffect } from "react";
import React from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaSave } from "react-icons/fa";


function App() {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([]);

  const [showfinshed, setShowfinshed] = useState(true);

  useEffect(() => {
    let todoData = localStorage.getItem("todos");
    if (todoData) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowfinshed(!showfinshed)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();

  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();

  };

  return (
    <>
      <Navbar />
      <div className="container  mx-auto my-5 rounded-xl p-5 bg-slate-500 min-h-[80vh] w-1/2">
        <h1 className="font-bold text-center text-xl">iTask Manage Your To-Do List</h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add ToDo</h2>
          <div className="flex">
            <input
              onChange={handleChange} value={todo} type="text" className="w-full rounded-full" />
            <button
              onClick={handleAdd} disabled={todo.length === 0}
              className="p-3 py-1 mx-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-800">
              <FaSave />
            </button>
          </div>

        </div>

        <input onChange={toggleFinished} className="mt-5" type="checkbox" checked={showfinshed} />Show Finshed
        <h2 className="text-lg font-bold text-center">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <span className="mx-3 text-gray-300">No To-Do To Display</span>
          )}
          {todos.map((item) => {
            return (showfinshed || !item.isCompleted) && (
              <div key={item.id} className="flex items-center justify-between my-2">
                <div className="flex gap-5 bg-white w-full rounded-lg">
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className="p-3 py-1 mx-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                    className="p-3 py-1 mx-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-800"  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
