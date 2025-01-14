import type { Todo, TodoId, TodoNotFound } from "@promus/domain";
import { Context, Effect, Layer } from "effect";
import { TodoRepository } from "@promus/persistence";

export class TodoService extends Context.Tag("TodoService")<
  TodoService,
  {
    readonly getAll: () => Effect.Effect<Todo[]>;
    readonly createTodo: (text: string) => Effect.Effect<Todo>;
    readonly completeTodo: (
      id: TodoId,
    ) => Effect.Effect<Todo, TodoNotFound>;
    readonly removeTodo: (id: TodoId) => Effect.Effect<void, TodoNotFound>;
  }
>() {}

export const TodoServiceLive = Layer.effect(
  TodoService,
  Effect.gen(function* () {
    const repo = yield* TodoRepository;
    return {
      getAll: () =>
        Effect.gen(function* () {
          return yield* repo.getAll();
        }),
      createTodo: (todo) =>
        Effect.gen(function* () {
          return yield* repo.create(todo);
        }),
      completeTodo: (id) =>
        Effect.gen(function* () {
          return yield* repo.complete(id);
        }),
      removeTodo: (id) =>
        Effect.gen(function* () {
          return yield* repo.remove(id);
        }),
    };
  }),
);
