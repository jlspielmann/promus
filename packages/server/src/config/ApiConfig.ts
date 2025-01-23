import { Config } from "effect";

export interface ApiConfig {
  host: string;
  port: number;
  timeout: number;
}

export const loadApiConfig: () => Config.Config<ApiConfig> = () =>
  Config.map(
    Config.all([
      Config.string("API_HOST"),
      Config.integer("API_PORT"),
      Config.integer("API_TIMEOUT"),
    ]),
    ([host, port, timeout]) => ({ host, port, timeout }),
  );
