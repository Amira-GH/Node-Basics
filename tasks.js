
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
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
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
function onDataReceived(text) {
  if ((text === 'quit\n') || (text === 'exit\n')) {
    quit();
  }
  else if (text.slice(0, 5) === "hello") {
    hello(text);
  }
  else if (text === 'help\n') {
    help();
  }
  else if (text === 'list\n'){
    list();
  }
  else if (text.split(' ')[0].trim() === 'add'){
    add(text.split(' ')[1]);
  }
  else if(text.slice(0,6)==='remove'){
    remove(text.slice(6));
  }
  else {
    unknownCommand(text);
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
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Amira Ghraizy")

/**list of all the possible commands 
* @returns {void}
*/
function help() {
  console.log('pssible command lines: \nhello ---> says hello!\nhello X ----> says hello X!\nquit ---> quits the application\nexit ---> exits the application')
}

const arrayList= ["T1", " T2", " T3"]

function list(){
   let x = arrayList.map(x => x+"\n")
   let y = x.toString().split(",").join("").trim()
   console.log('To Do List:\n',y)
}

function add(text){
  arrayList.push(text);
}

function remove(text){
  text = text.trim();
  if(text<=arrayList.length){
       if(text == ""){
          arrayList.pop();
  }
  else if(text == "1"){
    arrayList.shift();
  }
  else if(text == "2"){
    arrayList.splice(1,1);
    }
  }
}
