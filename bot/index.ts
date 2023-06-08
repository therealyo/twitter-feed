import Bot from "./Bot";

const main = () => {
  try {
    const bot = new Bot();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
      process.exit(1);
    }
  }
};

main();

export default main;
