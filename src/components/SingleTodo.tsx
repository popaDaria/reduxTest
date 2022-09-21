import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../models/model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import "./styles.css";
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../app/hooks';
import {
    deleteTodo,
    setTodoState,
    editTodoText
} from '../slices/todoSlice';

interface Props {
    todo: Todo;
    //todos: Todo[];
    //setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
    slice: string;
}

export interface DispatchMessage {
    content: any;
    slice: string;
}

let message: DispatchMessage;

const SingleTodo: React.FC<Props> = ({ todo, index, slice }) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const dispatch = useAppDispatch();


    const handleDone = (id: number) => {
        /* setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)); */
        message = { content: id, slice: slice };
        dispatch(setTodoState(message));
    };

    const handleDelete = (id: number) => {
        /* setTodos(todos.filter((todo) => todo.id !== id)); */
        message = { content: id, slice: slice };
        dispatch(deleteTodo(message));
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        /* setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, todo: editTodo } : todo
        ))); */
        message = { content: { id: id, todo: editTodo, isDone: false }, slice: slice };
        dispatch(editTodoText(message));
        setEdit(false);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <form className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`} onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {
                            edit ? (
                                <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todos__single--text" />
                            ) : todo.isDone ? (
                                <s className="todos__single--text">{todo.todo}</s>
                            ) : (
                                <span className="todos__single--text">{todo.todo}</span>
                            )
                        }
                        <div>
                            <span className="icon" onClick={(e) => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit);
                                }else if(edit){
                                    handleEdit(e,todo.id)
                                    setEdit(!edit);
                                }else if(todo.isDone){
                                    //todo: add a pop up message?
                                }
                            }}>
                                <AiFillEdit />
                            </span>
                            <span className="icon" onClick={() => handleDelete(todo.id)}>
                                <AiFillDelete />
                            </span>
                            <span className="icon" onClick={() => handleDone(todo.id)}>
                                <MdDone />
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default SingleTodo