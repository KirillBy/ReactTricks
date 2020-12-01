import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import './app.css';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem('Drink Beer'),
      this.createTodoItem('Learn React'),
      this.createTodoItem('Eat Pizza')
    ]
  };

  createTodoItem(label) {
    
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx +1);
      const newArray= [...before, ...after]
      return {
        todoData: newArray
      }
    })
  };

  addItem = (text) => {
    this.setState(({todoData}) => {
      const newArray = [...todoData, this.createTodoItem(text)];
      return {
        todoData: newArray
      }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx +1)];
    
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return{
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return{
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    })
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData
                      .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList 
        todos={todoData} 
        onDeleted={ this.deleteItem} 
        onToggleImportant={this.onToggleImportant}
        onToggleDone = {this.onToggleDone}
        />
        <ItemAddForm onAdd ={this.addItem}/>
      </div>
    );
  };
};

