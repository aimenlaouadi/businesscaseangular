import { Component } from '@angular/core';
import { Task } from '../typescript/entites';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: this.newTaskTitle,
        completed: false
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
  }
}