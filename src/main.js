import fs from "fs";
import path from "path";
import execa from "execa";

const modelFileTemplate = path.join(__dirname, "../templates/model.js");
const controllerFileTemplate = path.join(__dirname, "../templates/controller.js");
const routeFileTemplate = path.join(__dirname, "../templates/route.js");
const getErrorMessageFileTemplate = path.join(__dirname, "../templates/get-error-message.helper.js");
const httpStatusFileTemplate = path.join(__dirname, "../templates/http-status.helper.js");
const initFilesTemplates = fs.readdirSync(path.join(__dirname, "../templates/init"));

export const optionsModel = {
  skipController: false,
  skipModel: false,
  skipRoute: false,
  init: false,
  name: "",
  Name: "",
  dir: ""
};

function checkInitFiles(dir) {
  const initFiles = fs.readdirSync(path.join(dir));
  const filesToCopy = initFilesTemplates.filter(a => initFiles.indexOf(a) === -1);
  return filesToCopy;
}

export async function initializeProject(options = optionsModel) {
  const { dir } = options;
  const filesToCopy = checkInitFiles(options.dir);
  if (!filesToCopy.length) throw "Node project is already initialized. Execute 'create-service [serviceName]' for create a new service";
  console.log("Copying missing files...");
  filesToCopy.forEach(f => fs.createReadStream(path.join(__dirname, "../templates/init", f)).pipe(fs.createWriteStream(path.join(dir, f))));
  try {
    console.log("Checking git status...");
    await execa("git", ["status"], {
      cwd: options.dir
    });
    console.log("Git is already initialized!");
  } catch (error) {
    try {
      console.log("Initializing git...");
      await execa("git", ["init"], {
        cwd: options.dir
      });
      console.log("Git initialized");
      return;
    } catch (error) {
      console.log(error.stderr);
      return;
    }
  }
  console.log("Project ready. Execute 'create-service [serviceName]' for create a new service");
  return;
}

export default async function createService(options = optionsModel) {
  const { dir, name, Name } = options;

  // Verify if folder is a node project
  const packageFile = path.join(dir, "package.json");
  const isPackageFile = fs.existsSync(packageFile);
  if (!isPackageFile) throw "Current folder isn't a Node project. Please execute 'create-service --init'";

  // Verify inital files

  const missingFiles = checkInitFiles(options.dir);
  if (missingFiles.length) throw `Project have some missing files [${missingFiles.join(", ")}]. Please execute 'create-service --init'`;

  console.log(`Creating files for ${name}...`);

  // Folders
  const modelsFolder = path.join(dir, "models");
  const controllersFolder = path.join(dir, "controllers");
  const routesFolder = path.join(dir, "routes");

  // Files
  const modelFile = path.join(modelsFolder, `${name}.model.js`);
  const controllerFile = path.join(controllersFolder, `${name}.controller.js`);
  const routeFile = path.join(routesFolder, `${name}.route.js`);

  // Exist folders
  const isModelsFolder = fs.existsSync(modelsFolder);
  const isControllersFolder = fs.existsSync(controllersFolder);
  const isRoutesFolder = fs.existsSync(routesFolder);

  // Exist files
  const isModelFile = fs.existsSync(modelFile);
  const isControllerFile = fs.existsSync(controllerFile);
  const isRouteFile = fs.existsSync(routeFile);

  // Create folders if they aren't exists
  if (!isModelsFolder) fs.mkdirSync(modelsFolder);
  if (!isControllersFolder) fs.mkdirSync(controllersFolder);
  if (!isRoutesFolder) fs.mkdirSync(routesFolder);

  // Exit function if files aren't exists
  if (isModelFile) throw `Model file already exists ${modelFile}`;
  if (isControllerFile) throw `Controller file already exists ${controllerFile}`;
  if (isRouteFile) throw `Route file already exists ${routeFile}`;

  // Helpers exists
  const helpersFolder = path.join(dir, "helpers");
  if (!fs.existsSync(helpersFolder)) fs.mkdirSync(helpersFolder);
  const httpStatusFile = path.join(dir, "helpers/http-status.helper.js");
  const getErrorMessageFile = path.join(dir, "helpers/get-error-message.helper.js");
  const isHttpStatusFileTemplate = fs.existsSync(httpStatusFile);
  const isGetErrorMessageFileTemplate = fs.existsSync(getErrorMessageFile);

  // Create helpers if they aren't exists
  if (!isHttpStatusFileTemplate) fs.createReadStream(httpStatusFileTemplate).pipe(fs.createWriteStream(httpStatusFile));
  if (!isGetErrorMessageFileTemplate) fs.createReadStream(getErrorMessageFileTemplate).pipe(fs.createWriteStream(getErrorMessageFile));

  // Load template files
  const modelTemplate = fs.readFileSync(modelFileTemplate, "utf8").replace(/{name}/g, name);
  const controllerTemplate = fs
    .readFileSync(controllerFileTemplate, "utf8")
    .replace(/{name}/g, name)
    .replace(/{Name}/g, Name);
  const routeTemplate = fs.readFileSync(routeFileTemplate, "utf8").replace(/{name}/g, name);

  // Write templates in current folder
  fs.writeFileSync(modelFile, modelTemplate);
  fs.writeFileSync(controllerFile, controllerTemplate);
  fs.writeFileSync(routeFile, routeTemplate);
  console.log(`Service created [${name}]`);
}
