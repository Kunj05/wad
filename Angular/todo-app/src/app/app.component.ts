import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface Task {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  task: string = "";
  taskList: Task[] = [];

  addTask(){
    const newTask: Task = {
      id: this.taskList.length+1,  
      name: this.task
    };
    this.taskList.push(newTask);
    this.task = ""; 
    console.log(this.taskList)
  }
  deleteTask(id: number) {
    this.taskList = this.taskList.filter(task => task.id !== id);
  }
}
