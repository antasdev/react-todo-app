function TodoForm({
  todo,
  setTodo,
  addTodo,
  error
}) {
  return (
    <div className="w-full mb-8">

      <div className="flex gap-4">

        <input
          type="text"
          value={todo}
          onChange={(e) =>
            setTodo(e.target.value)
          }
          placeholder="Enter your task..."
          className="
            flex-1
            h-16
            px-5
            text-lg
            bg-[#111]
            text-white
            border
            border-[#d4af37]/40
            rounded-2xl
            outline-none
            focus:ring-2
            focus:ring-[#d4af37]
            placeholder:text-gray-500
          "
        />

        <button
          onClick={addTodo}
          className="
            px-8
            h-16
            bg-[#d4af37]
            text-black
            font-bold
            rounded-2xl
            hover:scale-105
            transition
            duration-300
            shadow-lg
          "
        >
          Add
        </button>

      </div>

      {
        error && (
          <div
            className="
              mt-4
              bg-red-500/15
              border
              border-red-500
              text-red-400
              px-4
              py-3
              rounded-xl
              animate-pulse
            "
          >
            {error}
          </div>
        )
      }

    </div>
  );
}

export default TodoForm;