import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import {
  deleteTodo,
  showEditTodo,
  updateTodo,
  updateTodoStatus,
} from "../../store/actions/todoActions";
import { useOutsideAlerter } from "../../utils/useOutsideAlerter";
import Button from "../atoms/Button";
import ErrorInput from "../atoms/ErrorInput";
import Input from "../atoms/Input";
import InputGroup from "../molecules/InputGroup";

const EditTodoDialog = ({
  updateTodo,
  todo,
  showEditTodo,
  updateTodoStatus,
  deleteTodo,
}) => {
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    isSubmitting,
    setValues,
  } = useFormik({
    initialValues: {
      id: "",
      title: "",
      description: "",
      createdAt: moment().format(),
      status: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required!"),
      description: Yup.string().required("Description is required!"),
    }),
    onSubmit: (values) => {
      updateTodo(values);
    },
  });

  useEffect(() => {
    if (todo) {
      setValues({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        createdAt: todo.createdAt,
      });
    }
  }, [todo]);

  const goBack = () => {
    showEditTodo();
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, goBack);

  console.log(todo.status);
  return (
    <div
      data-aos-duration="500"
      data-aos="fade-down"
      className="fixed inset-0 z-30 w-full h-scren flex items-center justify-center bg-black bg-opacity-70"
    >
      <form
        ref={wrapperRef}
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded-md p-7 md:w-1/4 w-1/2 h-1/2"
      >
        <div className="flex justify-center items-center h-1/5">
          <h1 className="md:text-xl text-lg font-bold">Edit Todo</h1>
        </div>

        <div className="my-2 w-full h-3/5">
          <InputGroup label="Title">
            <Input
              onChange={handleChange}
              type="text"
              value={values.title}
              name="title"
              errors={errors.title}
            />
            <ErrorInput touched={touched.title} errors={errors.title} />
          </InputGroup>
          <InputGroup label="Description">
            <Input
              onChange={handleChange}
              type="text"
              value={values.description}
              name="description"
              errors={errors.description}
            />
            <ErrorInput
              touched={touched.description}
              errors={errors.description}
            />
          </InputGroup>
        </div>
        <div
          className={
            "h-1/5 grid gap-x-2 " +
            (todo.status === 0 ? "grid-cols-3" : "grid-cols-2")
          }
        >
          {todo.status === 0 && (
            <Button
              type={"button"}
              color={"bg-red-500"}
              handleClick={() => deleteTodo(todo.id, todo.status)}
            >
              Delete
            </Button>
          )}
          <Button isSubmitting={isSubmitting} type={"submit"}>
            Save
          </Button>
          <Button
            type={"button"}
            color={"bg-green-500"}
            handleClick={() => updateTodoStatus(todo.status === 1 ? 0 : 1)}
          >
            {todo.status === 1 ? "Todo" : "Done"}
          </Button>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  todo: state.todo.todo,
  isShowEditTodo: state.todo.showEditTodo,
});

const mapDispatchToProps = (dispatch) => ({
  updateTodo: (values) => dispatch(updateTodo(values)),
  updateTodoStatus: (status) => dispatch(updateTodoStatus(status)),
  showEditTodo: (id) => dispatch(showEditTodo(id)),
  deleteTodo: (id, status) => dispatch(deleteTodo(id, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoDialog);
