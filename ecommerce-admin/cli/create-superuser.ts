import readline from "node:readline";
import MuteStream from "mute-stream";
import { createSuperuser } from "@/features/auth/server/user-manager.server";

function askQuestion(question: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

function askPassword(
  question: string,
  options: Pick<MuteStream.Options, "replace"> = { replace: "*" }
) {
  const ms = new MuteStream({
    replace: options.replace,
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: ms,
    terminal: true,
  });

  ms.pipe(process.stdout);

  rl.setPrompt(question);
  rl.prompt();

  ms.mute();

  return new Promise((resolve) =>
    rl.on("line", (answer) => {
      ms.unmute();
      rl.close();
      resolve(answer);
    })
  );
}

const main = async () => {
  const username = (await askQuestion("Username: ")) as string;
  const name = (await askQuestion("Name: ")) as string;

  const password = (await askPassword("Password: ")) as string;

  try {
    const user = await createSuperuser({ username, name }, password);

    if (!user) throw new Error("Can not create super user");

    console.log("Create super user successfully");
  } catch (error) {
    console.error(error);
  }
};

main();
