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
    ], 
    term: "",
    filter: "active" //active, act, done
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

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

  filterItems = (arr, term) => {
    if (term.length === 0){
      return arr;
    }
    return arr.filter((elem) => {
      return elem.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  changeTerm = (term) => {
    this.setState({term});
  }

  onFilterChange = (filter) => {
    this.setState({filter});
  }

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData
                      .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleData = this.filter(this.filterItems(todoData, term), filter);
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.changeTerm}/>
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
        </div>
        <TodoList 
        todos={visibleData} 
        onDeleted={ this.deleteItem} 
        onToggleImportant={this.onToggleImportant}
        onToggleDone = {this.onToggleDone}
        />
        <ItemAddForm onAdd ={this.addItem}/>
      </div>
    );
  };
};

