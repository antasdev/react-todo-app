function TodoItem({
  item,
  deleteTodo,
  toggleComplete,
  editId,
  editText,
  setEditText,
  startEdit,
  saveEdit
}) {

  return (
    <li
      className="
        bg-[#111]
        border
        border-[#d4af37]/20
        p-5
        rounded-2xl
        flex
        justify-between
        items-center
        hover:border-[#d4af37]
        transition
      "
    >

      <div className="flex items-center gap-4 flex-1">

        <div
          className="
            text-[#d4af37]
            text-xl
            cursor-grab
            select-none
          "
        >
          ⋮⋮
        </div>

        <input
          type="checkbox"
          checked={item.completed}
          onChange={() =>
            toggleComplete(item.id)
          }
          className="
            w-5
            h-5
            accent-[#d4af37]
          "
        />

        {editId === item.id ? (
          <input
            value={editText}
            onChange={(e) =>
              setEditText(e.target.value)
            }
            className="
              bg-[#1f1f1f]
              text-white
              border
              border-[#d4af37]
              px-4
              py-2
              rounded-xl
              w-full
            "
          />
        ) : (
          <span
            className={
              item.completed
                ? "line-through text-gray-500 text-lg"
                : "text-white text-lg"
            }
          >
            {item.text}
          </span>
        )}

      </div>

      <div className="flex gap-3">

        {editId === item.id ? (
          <button
            onClick={() =>
              saveEdit(item.id)
            }
            className="
              bg-green-500
              text-white
              px-4
              py-2
              rounded-xl
            "
          >
            Save
          </button>
        ) : (
          <button
            onClick={() =>
              startEdit(item)
            }
            className="
              bg-[#d4af37]
              text-black
              px-4
              py-2
              rounded-xl
              font-semibold
            "
          >
            Edit
          </button>
        )}

        <button
          onClick={() =>
            deleteTodo(item.id)
          }
          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Delete
        </button>

      </div>

    </li>
  );
}

export default TodoItem;