declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "production" | "development";
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
  }
}
