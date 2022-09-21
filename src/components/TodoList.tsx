import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import SingleTodo from './SingleTodo';
import './styles.css';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

/* interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
} */

const TodoList: React.FC = () => {

    let todos = useAppSelector((state: RootState) => state.counter.todosValue);
    todos= todos[0] === undefined ? [] : todos;
    const completedTodos = useAppSelector((state: RootState) => state.counter.completedTodosValue)

    return (
        <div className='container'>
            <Droppable droppableId='TodoList'>
                {
                    (provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">
                                Active Tasks
                            </span>
                            {
                                todos?.map((todo, index) => (
                                    <SingleTodo index={index} todo={todo} key={todo.id} slice={'value'} />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {
                    (provided, snapshot) => (
                        <div className={`todos remove ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">
                                Completed Tasks
                            </span>
                            {
                                completedTodos?.map((todo, index) => (
                                    <SingleTodo index={index} todo={todo} key={todo.id} slice={'completedValue'} />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}

export default TodoList