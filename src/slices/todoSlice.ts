import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DispatchMessage } from '../components/SingleTodo';
import { Todo } from '../models/model';

export interface TodosState {
    todosValue: Todo[];
    completedTodosValue: Todo[];
}

const initialState: TodosState = {
    todosValue: [],
    completedTodosValue: [],
};


export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            if (state.todosValue[0]!==undefined)
                state.todosValue = [...state.todosValue, { id: Date.now(), todo: action.payload, isDone: false }];
            else
                state.todosValue = [{ id: Date.now(), todo: action.payload, isDone: false }]
        },
        deleteTodo: (state, action: PayloadAction<DispatchMessage>) => {
            if (action.payload.slice === 'value')
                state.todosValue = state.todosValue.filter((todo) => todo.id !== action.payload.content);
            else
                state.completedTodosValue = state.completedTodosValue.filter((todo) => todo.id !== action.payload.content);
        },
        setTodoState: (state, action: PayloadAction<DispatchMessage>) => {
            if (action.payload.slice === 'value')
                state.todosValue = state.todosValue.map((todo) =>
                    todo.id === action.payload.content ? { ...todo, isDone: !todo.isDone } : todo);
            else
                state.completedTodosValue = state.completedTodosValue.map((todo) =>
                    todo.id === action.payload.content ? { ...todo, isDone: !todo.isDone } : todo);
        },
        editTodoText: (state, action: PayloadAction<DispatchMessage>) => {
            if (action.payload.slice === 'value')
                state.todosValue = state.todosValue.map((todo) => (
                    todo.id === action.payload.content.id ? { ...todo, todo: action.payload.content.todo } : todo
                ));
            else
                state.completedTodosValue = state.completedTodosValue.map((todo) => (
                    todo.id === action.payload.content.id ? { ...todo, todo: action.payload.content.todo } : todo
                ));
        },
        setTodoCompleted: (state, action: PayloadAction<Todo[]>) => {
            state.completedTodosValue = action.payload;
        },
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todosValue = action.payload;
        },
    },
});

export const { addTodo, deleteTodo, setTodoState, editTodoText, setTodoCompleted, setTodos } = todosSlice.actions;

export default todosSlice.reducer;
