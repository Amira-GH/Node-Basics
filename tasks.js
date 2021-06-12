
const fs = require('fs');

let database;
let arrayList = [['[✓] ','T1'],['[] ','T2'],['[] ','T3']];

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  if(process.argv[2] !== undefined){
    database = process.argv[2];
    writeToFile();
    }else{
        database = './database.json';
    }
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

function writeToFile(){
  fs.writeFile('./database.json',JSON.stringify(arrayList),(error)=>{
      if(error) 
      throw error;
  });
}

function readFromDatabase(){
  try{
      let contents = fs.readFileSync(database, 'utf8');
      listOfTasks = JSON.parse(contents);
      console.log("Reading from the database.json file:\n\n",listOfTasks)
      console.log("\n")
  }catch(error){
      console.log(error);
  }
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(mytext) {
  
  if ((mytext === 'quit\n') || (mytext === 'exit\n')) {
    quit();
  }
  else if (mytext.slice(0, 5) === "hello") {
    hello(mytext);
  }
  else if (mytext === 'help\n') {
    help();
  }
  else if (mytext === 'list\n'){
    readFromDatabase();
  }
  else if (mytext.split(' ')[0].trim() === 'add'){
    add(mytext.split(' ')[1]);
    writeToFile();
  }
  else if(mytext.slice(0,6)==='remove'){
    remove(mytext.slice(6));
    writeToFile();
  }
  else if(mytext.slice(0,4)==='edit'){
    edit(mytext.slice(5));
    writeToFile();
  }
  else if (mytext.startsWith("check")) {
      check(mytext);
      writeToFile();
  } else if (mytext.startsWith("uncheck")) {
      uncheck(mytext);
      writeToFile();
  }
  else {
    unknownCommand(mytext);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text) {
  console.log(text.trim() + '!');
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  fs.writeFileSync("database.json", JSON.stringify(arrayList));
  console.log('Quitting now, goodbye!');
  process.exit();
}

// The following line starts the application
startApp("Amira Ghraizy")

/**list of all the possible commands 
* @returns {void}
*/
function help() {
  console.log('pssible command lines: \nhello ---> says hello!\nhello X ----> says hello X!\nquit ---> quits the application\nexit ---> exits the application\nadd ---> adds a new task\nremove ---> removes a task\nlist --->lists all tasks')
}

done = [true, false];
function list() {
  for (var i = 0; i < arrayList.length; i++) {
    if (done[i] == true) {
      console.log(i + 1 + " - " + arrayList[i]);
    }
    else {
      console.log(i + 1 + " - " + arrayList[i]);
    }
  }
}

function add(text){
  arrayList.push(text);
}

function remove(text) {
  if (arrayList.length <= text) {
    console.log("Error. You entered a number greater than length of the list");
  } 
  else {
    arrayList.splice(text + 1, 1);
  }
}

function edit(text){
  if(text == ""){
    console.log("Error. You can't edit anything");
  }
  else if(text.charAt(0) == parseInt('1')){
    arrayList.splice(0,2,text);
  }
  else if(typeof text.charAt(0) === "string"){
    arrayList.pop();
    arrayList.push(text);
  }
  else if(typeof text.charAt(1) === "string"){
    arrayList.shift();
  }
}

/**
 * checks the unfinished task
 *
 * @checks {checks task}
 */

function check(text){
  text = text.split(" ");
  arrayList[text[1]-1][0] = '[✓]';
  writeToFile();
}

/**
 * unchecks the unfinished task
 *
 * @unchecks {unchecks task}
 */
 
 function uncheck(text){
  text = text.split(" ");
  arrayList[text[1]-1][0] = '[]';
  writeToFile();
}