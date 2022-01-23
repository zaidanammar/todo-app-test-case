import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { showEditTodo } from "../../store/actions/todoActions";

const Card = ({ todo, i, showEditTodo }) => {
  return (
    <div
      onClick={() => showEditTodo(todo.id)}
      key={i}
      className="bg-white my-4 p-4 rounded-md cursor-pointer hover:bg-opacity-70"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-lg text-gray-900 font-medium">{todo.title}</h1>
        <h1 className="text-sm text-gray-900 font-normal">
          {moment(todo.createdAt).format("ll hh:mm")}
        </h1>
      </div>
      <div>
        <h1 className="text-base text-gray-900 font-normal">
          {todo.description}
        </h1>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isShowEditTodo: state.todo.showEditTodo,
});

const mapDispatchToProps = (dispatch) => ({
  showEditTodo: (id) => dispatch(showEditTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
