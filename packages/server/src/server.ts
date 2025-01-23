import { NodeHttpServer } from "@effect/platform-node";
import { createServer } from "node:http";
import { Effect, Layer } from "effect";
import { ConfigService } from "./config/ConfigService.ts";

export const HttpServerLive = Effect.gen(
  function* () {
    const configService = yield* ConfigService;
    const config = configService.getApiConfig();
    return NodeHttpServer.layer(createServer, config);
  },
).pipe(Layer.unwrapEffect);
