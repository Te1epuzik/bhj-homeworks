"use strict";

class ToDo {
	constructor(container) {
		this.container = container;

		this.createTasksControl();
	}

	static savedTasks;

	static renderTasks() {
		if (!localStorage.getItem('Tasks')) {
			this.savedTasks = {};
			return;
		}
		this.savedTasks = JSON.parse(localStorage.getItem('Tasks'));

		const listContainer = this.container.querySelector('.tasks__list');
		Object.keys(this.savedTasks).forEach(Task => {
			const taskValue = this.savedTasks[Task];
			TasksList.createTask(listContainer, taskValue)
		});
	}

	createTasksControl() {
		new TasksControl(this.container.querySelector('.tasks__control'));
	}
}

class TasksControl {
	constructor(container) {
		this.container = container;
		this.tasksInput = container.querySelector('.tasks__input');
		this.tasksAddBtn = container.querySelector('.tasks__add');

		this.addTask();
	}

	addTask() {
		this.tasksAddBtn.addEventListener('click', event => {
			event.preventDefault();
			if (!this.tasksInput.value) {
				this.tasksInput.focus();
				return;
			}

			const listContainer = this.container.nextElementSibling;
			TasksList.createTask(listContainer, this.tasksInput.value);
			this.tasksInput.value = null;
		});
	}
}

class TasksList {
	static createTask(listContainer, taskValue) {
		listContainer.insertAdjacentHTML('afterBegin', 
		`<div class="task">
		<div class="task__title">
			${taskValue}
		</div>
		<a href="#" class="task__remove">&times;</a>
		</div>`
		);

		
		listContainer.addEventListener('click', event => {
			if (!event.target.closest('.task__remove')) {
				return;
			}
			
			event.target.parentElement.remove();
			delete ToDo.savedTasks[`${taskValue}`];
		});
		// ToDo.savedTasks[taskValue] = taskValue;

		localStorage.setItem('Tasks', JSON.stringify(ToDo.savedTasks));
	}
}

const toDo = new ToDo(document.querySelector('.tasks'));
ToDo.renderTasks;