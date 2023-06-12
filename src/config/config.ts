export interface Config {
  port: number;
  connectionString: string;
  feedGroupId: string;
  feedTopic: string;
}

const load = (): Config => {
  const {
    COCKROACH_USER = "root",
    COCKROACH_PASSWORD = "",
    COCKROACH_HOST = "cockroach-node-1",
    COCKROACH_PORT = 26257,
    COCKROACH_DATABASE = "postgres",
    PORT = 5000,
  } = process.env;

  const connectionString = `postgres://${COCKROACH_USER}:${COCKROACH_PASSWORD}@${COCKROACH_HOST}:${COCKROACH_PORT}/${COCKROACH_DATABASE}`;

  return {
    port: PORT,
    connectionString,
    feedGroupId: "twitter-feed",
    feedTopic: "feed",
  };
};

export default load;
