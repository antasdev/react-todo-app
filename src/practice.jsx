import { useState,useEffect } from "react"
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
  const storedTodos = localStorage.getItem("todos");

  return storedTodos
    ? JSON.parse(storedTodos)
    : [];
});
  const [editId,setEditId]=useState(null)
  const [editText,setEditText]=useState("")
  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  const addTodo = () => {
    if (!todo.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false
    }
    setTodos([...todos, newTodo]);
    setTodo("")
  }
  const deleteTodo = (id) => {
    const updateTodos = todos.filter((item) => item.id !== id)
    setTodos(updateTodos)
  }
  const toggleComplete = (id) => {
    const updateTodos = todos.map((item) => 
      item.id === id
        ? { ...item, completed: !item.completed } : item
    )
    setTodos(updateTodos)
  }
  const startEdit = (item) => {
  setEditId(item.id);
  setEditText(item.text);
};
const saveEdit = (id) => {
  const updatedTodos = todos.map((item) =>
    item.id === id
      ? { ...item, text: editText }
      : item
  );

  setTodos(updatedTodos);

  setEditId(null);
  setEditText("");
};
  return (
    <>
      <h1>TODO APP</h1>
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Enter todo" />
      <button onClick={addTodo}>Add</button>
      <ul>
  {
    [...todos].sort((a,b)=>a.completed-b.completed).map((item) => {
      return (
        <li key={item.id}>

          {
            editId === item.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button onClick={() => saveEdit(item.id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration:
                      item.completed
                        ? "line-through"
                        : "none"
                  }}
                >
                  {item.text}
                </span>

                <button onClick={() => startEdit(item)}>
                  Edit
                </button>
              </>
            )
          }

          <button onClick={() => deleteTodo(item.id)}>
            Delete
          </button>

          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(item.id)}
          />

        </li>
      )
    })
  }
</ul>

    </>
  )
}
export default App