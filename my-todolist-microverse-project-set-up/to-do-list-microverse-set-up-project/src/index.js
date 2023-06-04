/* eslint-disable no-unused-vars */
import _, { add } from 'lodash';
import './style.css';

const taskContainer = document.querySelector('.tasks-container');
const addBtn = document.getElementById('add-btn');
const storeTasks = JSON.parse(localStorage.getItem('Tasks')) || [];

const storeLocalStorage = (storeTasks) => {
  localStorage.setItem('Tasks', JSON.stringify(storeTasks));
};

const showTask = () => {
  taskContainer.innerHTML = '';
  storeTasks.forEach((task, index) => {
    taskContainer.innerHTML += `
            <li class="d-flex align-items-center task p-4 justify-content-between">
                <div class="checkbox-container">
                    <input type="checkbox" name="${task.description}" id="">
                    <input type="text" value="${task.description}" class="description-text w-75">
                </div>
                <i class="fa-solid fa-ellipsis-vertical fs-3" id=${index}></i>
        </li>
            `;
  });

  const remove = (item, index) => {
    item.addEventListener('click', () => {
      storeTasks.splice(index, 1);
      storeLocalStorage(storeTasks);
      showTask();
    });
  };

  const edit = (description, index) => {
    storeTasks[index].description = description;
    storeLocalStorage(storeTasks);
  };

  const addedTasks = document.querySelectorAll('.task');

  const checkboxContainer = document.querySelectorAll('.checkbox-container');
  const readOnlyAdd = (inputText) => {
    inputText.readOnly = true;
  };

  checkboxContainer.forEach((checkbox) => {
    const inputText = checkbox.querySelector(':scope > input[type="text"]');
    readOnlyAdd(inputText);
  });

  addedTasks.forEach((task, index) => {
    task.addEventListener('dblclick', (e) => {
      e.target.readOnly = false;
      if (task.querySelector('.fa-ellipsis-vertical')) {
        const ellipsisIcon = task.querySelector('.fa-ellipsis-vertical');
        const index = ellipsisIcon.getAttribute('id');
        task.classList.add('bg-orange');
        ellipsisIcon.classList.remove('fa-ellipsis-vertical');
        ellipsisIcon.classList.add('fa-solid');
        ellipsisIcon.classList.add('fa-trash');
        remove(ellipsisIcon, index);
      } else {
        task.classList.remove('bg-orange');
        const trashIcon = task.querySelector('.fa-trash');
        trashIcon.classList.remove('fa-soild');
        trashIcon.classList.remove('fa-trash');
        trashIcon.classList.add('fa-ellipsis-vertical');
        e.target.readOnly = true;
      }
    });
    // Edit
    task.addEventListener('input', () => {
      const data = task.querySelector('input[type="text"]').value.trim();
      edit(data, index);
    });
  });
};

const addTask = () => {
  const descriptionInput = document.getElementById('add-task-input');
  const description = descriptionInput.value.trim();
  if (description !== '') {
    const taskObject = {
      description,
      completed: false,
      index: storeTasks.length,
    };
    storeTasks.push(taskObject);
    storeLocalStorage(storeTasks);
    descriptionInput.value = '';
    showTask();
  } else {
    alert('Please fill some tasks');
  }
};

document.addEventListener('DOMContentLoaded', showTask);
addBtn.addEventListener('click', addTask);
