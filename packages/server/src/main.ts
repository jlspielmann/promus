import { HttpApiBuilder, HttpMiddleware } from "@effect/platform";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Layer } from "effect";

import { TodoRepository } from "@promus/persistence";
import { TodoServiceLive } from "@promus/service";
import { ApiLive } from "./api/api.ts";
import { ConfigServiceLive } from "./config/ConfigService.ts";
import { HttpServerLive } from "./server.ts";

const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(ApiLive),
  Layer.provide(TodoServiceLive),
  Layer.provide(TodoRepository.Default),
  Layer.provide(HttpServerLive),
  Layer.provide(ConfigServiceLive),
  Layer.provide(NodeContext.layer),
);

Layer.launch(HttpLive).pipe(
  NodeRuntime.runMain,
);
