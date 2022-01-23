import { useFormik } from "formik";
import moment from "moment";
import React, { useRef } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { postTodo, showAddTodo } from "../../store/actions/todoActions";
import { useOutsideAlerter } from "../../utils/useOutsideAlerter";
import Button from "../atoms/Button";
import ErrorInput from "../atoms/ErrorInput";
import Input from "../atoms/Input";
import InputGroup from "../molecules/InputGroup";

const AddTodoDialog = ({ postTodo, todos, showAddTodo }) => {
  const lastTodo = todos[todos.length - 1];
  const { handleSubmit, handleChange, errors, touched, values, isSubmitting } =
    useFormik({
      initialValues: {
        id: lastTodo.id + 1,
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
        postTodo(values);
      },
    });

  const goBack = () => {
    showAddTodo();
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, goBack);

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
          <h1 className="md:text-xl text-lg font-bold">Add Todo</h1>
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
        <div className="h-1/5 flex justify-center items-center">
          <Button isSubmitting={isSubmitting} type={"submit"}>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  todos: state.todo.todos,
});

const mapDispatchToProps = (dispatch) => ({
  postTodo: (values) => dispatch(postTodo(values)),
  showAddTodo: () => dispatch(showAddTodo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoDialog);
