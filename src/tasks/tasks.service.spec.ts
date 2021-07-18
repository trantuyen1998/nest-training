import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { Test } from '@nestjs/testing'
import { TaskRepository } from './task.repository'
import { TasksService } from './tasks.service'
import { TaskStatus } from './task-status.enum'
const mockUser = { id: 12, username: 'tuyen' }
const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
})

describe('TaskService', () => {
  let tasksService
  let taskRepository
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile()

    tasksService = await module.get<TasksService>(TasksService)
    taskRepository = await module.get<TaskRepository>(TaskRepository)
  })

  describe('getTasks', () => {
    it('get all tasks from the responsitory', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue')
      expect(taskRepository.getTasks).not.toHaveBeenCalled()

      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'some test',
      }

      //   call tasksService.getTasks
      const result = await tasksService.getTasks(filters, mockUser)

      expect(taskRepository.getTasks).toHaveBeenCalled()
      expect(result)
    })
  })

  describe('getTaskById', () => {
    it('call taskRepository.findOne() and success', async () => {
      const mockTask = { title: 'tets', description: 'hello' }
      taskRepository.findOne.mockResolvedValue(mockTask)

      const result = await tasksService.getTaskById(1, mockUser)
      expect(result).toEqual(mockTask)

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      })
    })
  })

  describe('createTask', () => {
    it('calls taskRepository.create() and return data', async () => {
      //   taskRepository.createTask.mockResolvedValue('someTask')
      //   expect(taskRepository.createTask).not.toHaveBeenCalled()
      //   const createTaskDto = { title: 'test task', description: 'hello' }
      //   const result = await tasksService.createTask(createTaskDto, mockUser)
      //   expect(taskRepository.createTask).toHaveBeenCalledWith(
      //     createTaskDto,
      //     mockUser,
      //   )
      //   expect(result).toEqual('someTask')
    })
  })
  describe('deleteTask', () => {
    it('calls taskRepository', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 })
      expect(taskRepository.delete).not.toHaveBeenCalled()
      await taskRepository.deleteTask(1, mockUser)
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: 1,
        userId: mockUser.id,
      })
    })
  })
})
