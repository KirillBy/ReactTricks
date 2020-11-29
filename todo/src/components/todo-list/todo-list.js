import React from 'react';
import TodoListItem from './../todo-list-item';
import './todo-list.css'

const TodoList = ({todos}) => {
    const elments = todos.map((item) =>  {
        const {id, ...itemProps } = item;
         return ( <li key={id} className="list-group-item"><TodoListItem {...itemProps}/></li>);
     });

    return (     
      <ul className="list-group todo-list">
          {elments}
      </ul> 
    );
  };

  export default TodoList;