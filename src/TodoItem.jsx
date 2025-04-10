import { useState } from "react";

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center justify-between p-2 border rounded mb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          id={`checkbox-${todo.id}`}
          name={`checkbox-${todo.id}`}
        />
        {isEditing ? (
          <input
            className="border p-1 rounded"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            id={`edit-input-${todo.id}`}
            name={`edit-input-${todo.id}`}
          />
        ) : (
          <span
            className={`text-lg ${todo.completed ? "line-through text-gray-500" : ""}`}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="bg-yellow-400 px-2 py-1 rounded text-white"
        > 
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 px-2 py-1 rounded text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
