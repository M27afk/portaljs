#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const prompts = require("prompts");
const path = require("path");
const { install, initGit } = require("./helpers/install");
const package = require("./package.json");
const copy = require("./helpers/copy");
const Listr = require("listr");

// Output path to create new portal app
let projectPath = ''

// Commander parameters to specify CLI behavior
program
  .name(package.name)
  .version(package.version)
  /**
   * TODO 
   * Add Options
   * Add Example Options
   * Add templates
   */
  .arguments("[dir]")
  .usage(`${chalk.yellow("[dir]")}`)
  .description({
    dir: "Directory to be used on install Portal.js",
  })
  .action((name) => (projectPath = name))
  .allowUnknownOption()
  .parse(process.argv);


/**
 * Method to ask a custon name if was not passed as parameter
 * returns the value passed from terminal input
 */
async function promptPath() {
  return prompts({
    type: "text",
    name: "path",
    message: "Choose a name to your project",
    initial: "",
    validate: (name) => {
      //TODO Method to validate valid path name
      return true;
    },
  });
}

  /**
   * Main method to start CLI and validate inputs
   */
  async function run(){
    if (typeof projectPath === "string") {
      projectPath = projectPath.trim();
    }
    if (!projectPath) {
      const response = await promptPath();
      if (typeof response.path === "string") {
        projectPath = response.path.trim();
      }
    }
    if (!projectPath) {
      //TODO separate log methods
      console.log();
      console.log("Please choose a name to your project:");
      console.log();
      console.log("Example:");
      console.log(
        `${chalk.cyan(program.name())} ${chalk.yellow("ny-portal-app")}`
      );
      console.log();
  
      process.exit(1);
    }
  
    /**
     * TODO Include workflow to create and manage the files and options
     * 
     * Example: 
     * createApp()
     *   .then(installDependencies)
     *   .then(renameFiles)
     *   .then(accessFolder)
     *   .then(checkUpdated) 
     */
  }

  //Main CLI execution workflow
  run()
  .then(`${chalk.greenBright('Project Installed Sucess')}`)
  .catch(error => {
    if(error.command){
      console.log(`${chalk.cyan('Error on Create App')}`)
    }else{
      console.log(`${chalk.red('Unexpected Erro. Please report it as a bug')}`)
      console.log(error)
    }
    console.log()
    process.exit(1)
  })