import React, {useState, useReducer,createContext, useContext, useRef} from 'react'

const initialTodos = [
   {
      id: 1,
      text: '프로젝트 생성하기',
      done: true
   },
   {
      id: 2,
      text: '컴포넌트 스타일링하기',
      done: true
   },
   {
      id: 3,
      text: 'Context 만들기',
      done: false
   },
   {
      id: 4,
      text: '기능 구현하기',
      done: false
   },
];

function todoReducer(state, action) {

   switch (action.type) {
      case 'CREATE':
         return state.concat(action.todo);
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
const DataContext = createContext();
const SetDataContext = createContext();

export function TodoProvider({ children }) {
   const [state, dispatch] = useReducer(todoReducer, initialTodos);
   const nextId = useRef(5);
   const [data,setData] = useState('');

   return (
      <SetDataContext.Provider value={setData}>
      <DataContext.Provider value={data}>
      <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
      <TodoNextIdContext.Provider value={nextId}>
        {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
    </DataContext.Provider>
    </SetDataContext.Provider>
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

 export function useData() {
   const context = useContext(DataContext);
   if (!context) {
     throw new Error('Cannot find TodoProvider');
   }
   return context;
 }

 export function useSetData() {
   const context = useContext(SetDataContext);
   if (!context) {
     throw new Error('Cannot find TodoProvider');
   }
   return context;
 }