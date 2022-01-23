import React from "react";
import Card from "../atoms/Card";

const Boards = ({ todos, title, sort, status, showEditTodo }) => {
  return (
    <aside
      className={
        "rounded-md shadow-md p-5 min-h-full " +
        (status === 0 ? "bg-slate-300" : "bg-pink-500")
      }
    >
      <h1 className="font-bold text-center text-2xl">{title}</h1>
      {todos
        .filter((todo) => todo.status === status)
        .sort((a, b) =>
          sort === "asc"
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt)
        )
        .map((todo, i) => (
          <Card todo={todo} i={i} />
        ))}
    </aside>
  );
};

export default Boards;
