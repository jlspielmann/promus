import { Context, Effect, Layer } from "effect";
import { type ApiConfig, loadApiConfig } from "./ApiConfig.ts";
import { PlatformConfigProvider } from "@effect/platform";

export class ConfigService extends Context.Tag("ConfigService")<
  ConfigService,
  {
    readonly getApiConfig: () => ApiConfig;
  }
>() {}

export const ConfigServiceLive = Layer.effect(
  ConfigService,
  Effect.gen(function* () {
    const apiConfig = yield* loadApiConfig();
    return {
      getApiConfig: () => apiConfig,
    };
  }),
).pipe(
  Layer.provide(PlatformConfigProvider.layerDotEnv(".env")),
);
