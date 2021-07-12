import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // @Body() task -> pass a object
  @Post()
  createTask(@Body('title') title, @Body('description') description) {
    return this.tasksService.createTask(title, description);
  }
}
