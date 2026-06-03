import TodoItem from "./TodoItem";

function TodoList({
  todos,
  setTodos,
  deleteTodo,
  toggleComplete,
  editId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  draggedItem,
  setDraggedItem
}) {

  const handleDrop = (dropIndex) => {

    if (draggedItem === null) return;

    const updatedTodos = [...todos];

    const draggedTodo =
      updatedTodos[draggedItem];

    updatedTodos.splice(
      draggedItem,
      1
    );

    updatedTodos.splice(
      dropIndex,
      0,
      draggedTodo
    );

    setTodos(updatedTodos);

    setDraggedItem(null);
  };

  return (
    <ul className="space-y-4">

      {[...todos].sort((a,b)=>a.completed-b.completed).map((item, index) => (

        <div
          key={item.id}
          draggable
          onDragStart={() =>
            setDraggedItem(index)
          }
          onDragOver={(e) =>
            e.preventDefault()
          }
          onDrop={() =>
            handleDrop(index)
          }
          className="cursor-move"
        >

          <TodoItem
            item={item}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            editId={editId}
            editText={editText}
            setEditText={setEditText}
            startEdit={startEdit}
            saveEdit={saveEdit}
          />

        </div>

      ))}

    </ul>
  );
}

export default TodoList;