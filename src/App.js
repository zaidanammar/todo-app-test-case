import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import AddTodoDialog from "./components/organisms/AddTodoDialog";
import { getTodos, showAddTodo } from "./store/actions/todoActions";
import AOS from "aos";
import "aos/dist/aos.css";
import EditTodoDialog from "./components/organisms/EditTodoDialog";
import Boards from "./components/molecules/Boards";

const App = ({
  todos,
  todo,
  isShowAddTodo,
  isShowEditTodo,
  getTodos,
  showAddTodo,
  showEditTodo,
}) => {
  useEffect(() => {
    AOS.init();
    getTodos();
  }, [getTodos]);

  return (
    <Fragment>
      {isShowAddTodo && <AddTodoDialog />}
      {isShowEditTodo && <EditTodoDialog />}
      <div className="mt-10">
        <h1 className="text-white text-center font-bold md:text-4xl text-2xl">
          List Todo
        </h1>
      </div>
      <div className="mt-3 flex justify-center items-center">
        <h1
          onClick={showAddTodo}
          className="text-white hover:text-pink-500 cursor-pointer font-bold text-xl"
        >
          Add Todo
        </h1>
      </div>
      <section className="grid grid-cols-2 gap-10 mt-10 mx-20">
        <Boards todos={todos} title={"Todo"} sort={"asc"} status={0} />
        <Boards todos={todos} title={"Done"} sort={"desc"} status={1} />
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
  todo: state,
  isShowAddTodo: state.todo.showAddTodo,
  isShowEditTodo: state.todo.showEditTodo,
});

const mapDispatchToProps = (dispatch) => ({
  getTodos: () => dispatch(getTodos()),
  showAddTodo: () => dispatch(showAddTodo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
