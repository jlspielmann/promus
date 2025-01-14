import { Schema } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "@effect/platform";
import { Todo, TodoIdFromString, TodoNotFound } from "@promus/domain";

export class TodoApiGroup extends HttpApiGroup.make("todo")
  .add(
    HttpApiEndpoint
      .get("getAllTodos", "/todos")
      .addSuccess(Schema.Array(Todo)),
  )
  .add(
    HttpApiEndpoint
      .post("createTodo", "/todos")
      .addSuccess(Todo)
      .setPayload(Schema.Struct({ text: Schema.NonEmptyTrimmedString })),
  )
  .add(
    HttpApiEndpoint
      .patch("completeTodo", "/todos/:id")
      .addSuccess(Todo)
      .addError(TodoNotFound, { status: 404 })
      .setPath(Schema.Struct({ id: TodoIdFromString })),
  )
  .add(
    HttpApiEndpoint
      .del("deleteTodo", "/todos/:id")
      .addSuccess(Schema.Void)
      .addError(TodoNotFound, { status: 404 })
      .setPath(Schema.Struct({ id: TodoIdFromString })),
  ) {}

export class TodoApi extends HttpApi.make("api").add(TodoApiGroup) {}
