import fs from "fs";
import path from "path";

const modelFileTemplate = path.join(__dirname, "../templates/model.js");
const controllerFileTemplate = path.join(__dirname, "../templates/controller.js");
const routeFileTemplate = path.join(__dirname, "../templates/route.js");
const getErrorMessageFileTemplate = path.join(__dirname, "../templates/get-error-message.helper.js");
const httpStatusFileTemplate = path.join(__dirname, "../templates/http-status.helper.js");

export const optionsModel = {
  skipController: false,
  skipModel: false,
  skipRoute: false,
  name: "",
  Name: "",
  dir: ""
};

export default async function createService(options = optionsModel) {
  try {
    const { dir, name, Name } = options;
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

    if (!isHttpStatusFileTemplate)
      fs.createReadStream(httpStatusFileTemplate).pipe(fs.createWriteStream(httpStatusFile));
    if (!isGetErrorMessageFileTemplate)
      fs.createReadStream(getErrorMessageFileTemplate).pipe(fs.createWriteStream(getErrorMessageFile));

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
  } catch (error) {
    console.log(error);
  }
}
