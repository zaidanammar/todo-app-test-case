import AxiosInstance from "../../config/AxiosInstance";
import {
  GET_TODOS,
  SHOW_ADD_TODO,
  POST_TODO,
  SHOW_EDIT_TODO,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
  DELETE_TODO,
} from "../types";

const getTodos = () => async (dispatch) => {
  try {
    const data = await AxiosInstance.API().get("/");
    const todos = await data.data;
    dispatch({
      type: GET_TODOS,
      payload: todos,
    });
  } catch (error) {
    console.error("getTodos() error: " + error);
  }
};

const showAddTodo = () => (dispatch) => {
  dispatch({
    type: SHOW_ADD_TODO,
  });
};

const showEditTodo = (id) => (dispatch) => {
  dispatch({
    type: SHOW_EDIT_TODO,
    payload: id,
  });
};

const postTodo = (new_todo) => (dispatch) => {
  dispatch({
    type: POST_TODO,
    payload: new_todo,
  });
};

const updateTodo = (todo) => (dispatch) => {
  dispatch({
    type: UPDATE_TODO,
    payload: todo,
  });
};

const updateTodoStatus = (status) => (dispatch) => {
  dispatch({
    type: UPDATE_TODO_STATUS,
    payload: status,
  });
};

const deleteTodo = (id, status) => (dispatch) => {
  dispatch({
    type: DELETE_TODO,
    payload: { id, status },
  });
};

export {
  getTodos,
  showAddTodo,
  postTodo,
  showEditTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
};
