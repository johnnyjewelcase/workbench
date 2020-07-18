import React, { useReducer, useRef } from "react";
import "./App.css";

const TodoList = () => {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer((state, action) => {
    if (action.type === "add") {
      const todo = {
        id: Math.floor(Math.random() * 10000),
        name: action.name
      };
      return [...state, todo];
    } else if (action.type === "remove") {
      return state.filter(item => item.id !== action.payload);
    } else {
      return state;
    }
  }, []);

  const items = [];

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "add",
      payload: inputRef.current.value
    });

    inputRef.current.value = "";
  }

  return (
    <div className="container text-center">
      <h1>Create a Todo List!</h1>
      <form className="form-group mt-5" onSubmit={handleSubmit}>
        <input
          className="form-control"
          placeholder="Start typing what you need to do..."
          ref={inputRef}
        />
        <button className="btn btn-success mt-3 mb-5" type="submit">
          Add to List
        </button>
      </form>
      <h4>My Todo List:</h4>
      <ul className="list-group">
        {items.map((item, index) => (
          <li className="list-group-item" key={item.id}>
            {item.name}{" "}
            <button
              className="btn btn-danger"
              onClick={() =>
                dispatch({
                  type: "remove",
                  payload: item.id
                })
              }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
