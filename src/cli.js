import arg from "arg";
import createService, { initializeProject } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--noController": Boolean,
      "--noModel": Boolean,
      "--noRoute": Boolean,
      "--init": Boolean
    },
    {
      argv: rawArgs.slice(2)
    }
  );
  return {
    skipController: args["--noController"] || false,
    skipModel: args["--noModel"] || false,
    skipRoute: args["--noRoute"] || false,
    init: args["--init"] || false,
    name: args._[0] ? args._[0] : "",
    Name: args._[0] ? args._[0][0].toUpperCase() + args._[0].slice(1) : "",
    dir: process.cwd()
  };
}

export async function cli(args) {
  try {
    const options = parseArgumentsIntoOptions(args);
    if (options.init) return await initializeProject(options);
    if (!options.name) return console.log("Service's name not given");
    await createService(options);
  } catch (error) {
    console.log(error);
  }
}
