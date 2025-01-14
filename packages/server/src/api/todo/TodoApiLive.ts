import { HttpApiBuilder } from "@effect/platform";
import { TodoApi } from "./TodoApi.ts";
import { TodoService } from "@promus/service";
import { Effect } from "effect";

export const TodoApiLive = HttpApiBuilder.group(
  TodoApi,
  "todo",
  (handlers) =>
    Effect.gen(function* () {
      const todoService = yield* TodoService;
      return handlers
        .handle("getAllTodos", () => todoService.getAll())
        .handle("createTodo", ({ payload: { text } }) =>
          todoService.createTodo(text))
        .handle("completeTodo", ({ path: { id } }) =>
          todoService.completeTodo(id))
        .handle("deleteTodo", ({ path: { id } }) =>
          todoService.removeTodo(id));
    }),
);
