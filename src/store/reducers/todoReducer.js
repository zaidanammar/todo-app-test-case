import {
  GET_TODOS,
  SHOW_ADD_TODO,
  SHOW_EDIT_TODO,
  POST_TODO,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
  DELETE_TODO,
} from "../types";

const initialState = {
  todos: [],
  todo: null,
  showAddTodo: false,
  showEditTodo: false,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case SHOW_ADD_TODO:
      return {
        ...state,
        showAddTodo: !state.showAddTodo,
      };
    case SHOW_EDIT_TODO:
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        return {
          ...state,
          showEditTodo: !state.showEditTodo,
          todo,
        };
      }
      return {
        ...state,
        showEditTodo: !state.showEditTodo,
        todo: null,
      };
    case POST_TODO:
      const todos = [...state.todos];
      const new_todo = action.payload;
      return {
        ...state,
        todos: todos.concat(new_todo),
        showAddTodo: false,
      };
    case UPDATE_TODO:
      const prev_todo = [...state.todos];
      const updated_todo = action.payload;
      prev_todo.splice(updated_todo.id - 1, 1, updated_todo);
      return {
        ...state,
        todos: prev_todo,
        showEditTodo: false,
      };
    case UPDATE_TODO_STATUS:
      const prev_todo_status = [...state.todos];
      const todo_index = state.todo;
      todo_index.status = action.payload;
      prev_todo_status.splice(state.todo.id - 1, 1, todo_index);
      return {
        ...state,
        todos: prev_todo_status,
        showEditTodo: false,
      };
    case DELETE_TODO:
      const delete_todo = [...state.todos];
      const payload = action.payload;
      let temp_todos = [];
      if (payload.status === 0) {
        temp_todos = delete_todo.filter((todo) => todo.id !== payload.id);
      }
      return {
        ...state,
        todos: temp_todos,
        showEditTodo: false,
      };
    default:
      return state;
  }
};

export default todoReducer;
