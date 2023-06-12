export interface Config {
  port: number;
  connectionString: string;
  feedGroupId: string;
  feedTopic: string;
}

const load = (): Config => {
  return {
    port: process.env.PORT || 5000,
    connectionString: `postgres://${process.env.COCKROACH_USER}:${process.env.COCKROACH_PASSWORD}@${process.env.COCKROACH_HOST}:${process.env.COCKROACH_PORT}/${process.env.COCKROACH_DATABASE}`,
    feedGroupId: "twitter-feed",
    feedTopic: "feed",
  };
};

export default load;
