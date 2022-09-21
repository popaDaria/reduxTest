import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './models/model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { PersistGate } from "redux-persist/integration/react";
import { useAppSelector, useAppDispatch } from './app/hooks';
import { RootState } from './app/store';
import {
  addTodo,
  setTodos,
  setTodoCompleted
} from './slices/todoSlice';


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.counter.todosValue)
  const completedTodos = useAppSelector((state: RootState) => state.counter.completedTodosValue)

  //const [todos, setTodos] = useState<Todo[]>([]);
  //const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      //setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      dispatch(addTodo(todo));
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    // console.log(result)
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, active:Todo[] = [...todos], complete:Todo[] = [...completedTodos];

    /* console.log(active)
    console.log(complete) */

    if (source.droppableId === 'TodoList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodoList') {
      add = {...add, isDone:false};
      active.splice(destination.index, 0, add);
    } else {
      add = {...add, isDone:true};
      complete.splice(destination.index, 0, add);
    }

    dispatch(setTodos(active));
    dispatch(setTodoCompleted(complete));
    /* setCompletedTodos(complete);
    setTodos(active); */
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="App">
            <span className='heading'>Taskify</span>

            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            <TodoList />
          </div>
        </DragDropContext>
      </PersistGate>
    </Provider>
  );
}

export default App;
