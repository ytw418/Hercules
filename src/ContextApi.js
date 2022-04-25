import React, { useState, useReducer, createContext, useContext, useRef } from 'react'
import {firebase_db} from "./firebaseConfig"

const initialTodos = {
  inputs: {
    username: '',
    text: ''
  },
  users: [
    {
      id: 1,
      uid:'',
      username: '윤성준',
      text: '안녕하세요',
      active: true
    },
  ]
  
};

function todoReducer(state, action) {


  switch (action.type) {
    case 'CREATE_USER':
      return {users:state.users.concat(action.user)};
    case 'CREATE':
      return   firebase_db.ref('/users').set(state.users);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo);
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }

}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
const UIDContext = createContext();
const SetUIDContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  const [UID, SetUID] = useState('유저데이터없음');

  

  console.log(UID)
  
  console.log(state)

  return (
    <SetUIDContext.Provider value={SetUID}>
      <UIDContext.Provider value={UID}>
        <TodoStateContext.Provider value={state}>
          <TodoDispatchContext.Provider value={dispatch}>
            <TodoNextIdContext.Provider value={nextId}>
              {children}
            </TodoNextIdContext.Provider>
          </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
      </UIDContext.Provider>
    </SetUIDContext.Provider>
  );
}


// 커스텀 hook 과 에러처리 구문
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useUID() {
  const context = useContext(UIDContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useSetUID() {
  const context = useContext(SetUIDContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}