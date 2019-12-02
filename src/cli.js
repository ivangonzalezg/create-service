import arg from "arg";
import createService from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--noController": Boolean,
      "--noModel": Boolean,
      "--noRoute": Boolean
    },
    {
      argv: rawArgs.slice(2)
    }
  );
  return {
    skipController: args["--noController"] || false,
    skipModel: args["--noModel"] || false,
    skipRoute: args["--noRoute"] || false,
    name: args._[0],
    Name: args._[0][0].toUpperCase() + args._[0].slice(1),
    dir: process.cwd()
  };
}

export async function cli(args) {
  const options = parseArgumentsIntoOptions(args);
  if (!options.name) return console.log("Service's name not given");
  await createService(options);
}
