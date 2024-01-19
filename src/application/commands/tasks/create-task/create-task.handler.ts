import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command';
import { ITaskRepository } from '@application/common/interfaces/task/task-repository.interface';
import { Inject } from '@nestjs/common';
import { TASK_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { Task } from '../../../../domain/tasks/task';

@CommandHandler(CreateTaskCommand)
class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute({ dto, author }: CreateTaskCommand): Promise<Task> {
    const task = new Task(
      dto.name,
      dto.startDate,
      dto.endDate,
      dto.status,
      dto.priority,
      dto.type,
      dto.description,
      dto.caseId,
      dto.assigneeIds,
    );

    task.setId = dto.id;

    const createdTask = await this.taskRepository.create(task, author);

    return createdTask;
  }
}

export default CreateTaskHandler;
