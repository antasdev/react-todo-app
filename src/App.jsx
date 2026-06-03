import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {

  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState(() => {
    const storedTodos =
      localStorage.getItem("todos");

    return storedTodos
      ? JSON.parse(storedTodos)
      : [];
  });

  const [editId, setEditId] =
    useState(null);

  const [editText, setEditText] =
    useState("");

  const [error, setError] =
    useState("");

  // CUSTOM DELETE MODAL STATES
  const [showModal, setShowModal] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos]);

  const [draggedItem, setDraggedItem] =
    useState(null);

  // ADD TODO
  const addTodo = () => {

    if (!todo.trim()) {
      setError("Todo cannot be empty");
      return;
    }

    if (todo.trim().length < 3) {
      setError(
        "Minimum 3 characters required"
      );
      return;
    }

    const alreadyExists = todos.some(
      (item) =>
        item.text.toLowerCase() ===
        todo.toLowerCase()
    );

    if (alreadyExists) {
      setError("Todo already exists");
      return;
    }

    setError("");

    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false
    };

    setTodos([...todos, newTodo]);

    setTodo("");
  };

  // OPEN DELETE MODAL
  const deleteTodo = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // CONFIRM DELETE
  const confirmDelete = () => {

    const updatedTodos =
      todos.filter(
        (item) => item.id !== deleteId
      );

    setTodos(updatedTodos);

    setShowModal(false);
  };

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {

    const updatedTodos =
      todos.map((item) =>
        item.id === id
          ? {
            ...item,
            completed:
              !item.completed
          }
          : item
      );

    setTodos(updatedTodos);
  };

  // START EDIT
  const startEdit = (item) => {
    setEditId(item.id);
    setEditText(item.text);
  };

  // SAVE EDIT
  const saveEdit = (id) => {

    if (!editText.trim()) {
      setError("Todo cannot be empty");
      return;
    }

    if (editText.trim().length < 3) {
      setError(
        "Minimum 3 characters required"
      );
      return;
    }

    const updatedTodos =
      todos.map((item) =>
        item.id === id
          ? {
            ...item,
            text: editText
          }
          : item
      );

    setTodos(updatedTodos);

    setEditId(null);

    setEditText("");

    setError("");
  };

  return (

    <div
      className="
        min-h-screen
        bg-[#0f0f0f]
        flex
        justify-center
        items-center
        p-6
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          bg-[#1a1a1a]
          border
          border-[#d4af37]/30
          rounded-3xl
          shadow-2xl
          p-8
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            text-center
            text-[#d4af37]
            mb-8
            tracking-wide
          "
        >
          Todo App
        </h1>

        <TodoForm
          todo={todo}
          setTodo={setTodo}
          addTodo={addTodo}
          error={error}
        />

        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          editId={editId}
          editText={editText}
          setEditText={setEditText}
          startEdit={startEdit}
          saveEdit={saveEdit}
          draggedItem={draggedItem}
          setDraggedItem={setDraggedItem}
          setTodos={setTodos}
        />

      </div>

      {/* CUSTOM DELETE MODAL */}

      {
        showModal && (

          <div
            className="
              fixed
              inset-0
              bg-black/70
              flex
              justify-center
              items-center
              z-50
            "
          >

            <div
              className="
                bg-[#1a1a1a]
                border
                border-[#d4af37]
                p-8
                rounded-3xl
                w-[350px]
                text-center
                shadow-2xl
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                  text-[#d4af37]
                  mb-4
                "
              >
                Delete Todo?
              </h2>

              <p
                className="
                  text-gray-400
                  mb-6
                "
              >
                This action cannot be undone.
              </p>

              <div
                className="
                  flex
                  gap-4
                  justify-center
                "
              >

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="
                    px-5
                    py-3
                    bg-gray-700
                    text-white
                    rounded-xl
                    hover:bg-gray-600
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="
                    px-5
                    py-3
                    bg-red-500
                    text-white
                    rounded-xl
                    hover:bg-red-600
                    transition
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
}

export default App;