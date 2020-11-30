import React from 'react';
import './item-add-form.css';

const ItemAddForm = ({onAdd}) => {
    return (
        <div className='add-item-form'>
            <button className="btn btn-outline-secondary" onClick={() => onAdd('Study React')}>Add Task</button>
        </div>
    );
};

export default ItemAddForm;