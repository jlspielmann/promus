import { Layer } from "effect";
import { HttpApiBuilder } from "@effect/platform";
import { TodoApiLive } from "./todo/TodoApiLive.ts";
import { TodoApi } from "./todo/TodoApi.ts";

export const ApiLive = HttpApiBuilder.api(TodoApi).pipe(
  Layer.provide(TodoApiLive),
);
