import { HttpApiBuilder, HttpMiddleware } from "@effect/platform";
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { createServer } from "node:http";
import { Layer } from "effect";

import { TodoRepository } from "@promus/persistence";
import { TodoServiceLive } from "@promus/service";
import { ApiLive } from "./api/api.ts";

const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(ApiLive),
  Layer.provide(TodoServiceLive),
  Layer.provide(TodoRepository.Default),
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 })),
);

Layer.launch(HttpLive).pipe(
  NodeRuntime.runMain,
);
