import readline from "node:readline";
import MuteStream from "mute-stream";
import { createSuperuser } from "@/features/auth/server/user-manager.server";

const ms = new MuteStream({
  replace: "*",
});

ms.pipe(process.stdout);

// Create an interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: ms,
  terminal: true,
});

const askQuestion = (question: string) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const askPassword = (question: string) => {
  rl.setPrompt(question);
  rl.prompt();

  ms.mute();

  return new Promise((resolve) => {
    rl.on("line", (answer) => {
      resolve(answer);
      ms.unmute();
    });
  });
};

// Main async function
const main = async () => {
  const username = (await askQuestion("Username: ")) as string;
  const name = (await askQuestion("Name: ")) as string;

  const password = (await askPassword("Password: ")) as string;

  try {
    await createSuperuser({ username, name }, password);
    console.log("Create user successfully");
  } catch (error) {
    console.error(error);
  } finally {
    rl.close();
    return;
  }
};

// Call the main async function
main();
