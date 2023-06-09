import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './style.css';
import { Draggable } from 'react-beautiful-dnd';
type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo?.todo);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo?.id !== id));
  };
  const handleEdit = (id: number) => {
    if (!isEdit && !todo.isDone) {
      setIsEdit(!isEdit);
    }
  };
  const handleUpdate = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setIsEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);
  // const drpId = Math.floor(Math.random() * 1000).toString();
  // console.log(drpId.toString());
  return (
    <Draggable draggableId={todo?.id.toString()} index={index}>
      {(provided) => (
        <form
          className='single-todo'
          onSubmit={(e) => handleUpdate(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEdit ? (
            <input
              ref={inputRef}
              value={editTodo}
              className='todo-text'
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo?.isDone ? (
            <s className='todo-text'>{todo?.todo}</s>
          ) : (
            <span className='todo-text'>{todo?.todo}</span>
          )}
          <div>
            <span className='icon' onClick={() => handleEdit(todo.id)}>
              <AiFillEdit />
            </span>
            <span className='icon' onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className='icon' onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
