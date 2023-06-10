declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "production" | "development";
    PORT: number;
    COCKROACH_HOST: string;
    COCKROACH_PORT: number;
    COCKROACH_USER: string;
    COCKROACH_PASSWORD: string;
    COCKROACH_DATABASE: string;
  }
}
