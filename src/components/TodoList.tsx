import React from 'react';
import { Todo } from '../model';
import './style.css';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  CompletedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className='container'>
      <Droppable droppableId='TodosList'>
        {(provided) => (
          <div
            className='todos'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h4 className='active-tasks'>Active Tasks</h4>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo?.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {(provided) => (
          <div
            className='todos remove'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h4 className='active-tasks completed'>Completed Tasks</h4>
            {CompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={CompletedTodos}
                key={todo?.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
