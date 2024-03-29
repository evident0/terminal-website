var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

const VOLUME_MUTE = 181;
const ENTER_KEY = 13;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

var files = ["1st_design", "skuld-files", "mail-system", "FutureGadgetLab", "gate_theory"];
var designFiles = ["schematics.vec", "notes.txt"];
var skuldFiles = ["operation_skuld.txt"];
var mailFiles = ["d_mail_standard.txt"];
var futureGadgetLab = ["investigation.txt"];
var phone_wave = ["research.txt", "schematic_overview.txt"];
var gate_theory = ["gate_theory.txt"];


var git = 0;
var fillPasswordEnabled = false;
let correctPassword = false;
var commands = [];
var isRoot = false;

setTimeout(function() {
  loopLines(banner, "", 100);
  textarea.focus();
}, 100);

//init
textarea.value = "";
command.innerHTML = textarea.value;

window.addEventListener("keyup", enterKey);

function isPassword(){
  if (textarea.value.replace(/(\r\n|\n|\r)/gm, "") === password) {
    isRoot = true;
    return true;
  }
  return false;
}

var current_path = "";
var current_ls = ls;
var available_cat_function = main_cat;

function design_cat(file){
  if("schematics.vec" === file){
    return ["failed to import vec file 89a7#9h4rt*fgyn()fASsdfSD&)(^T^)*(AfFG*&ADASR&^$%&adF*$*dfasd987qwt78^*",];
  }
  else if("notes.txt" === file){
    return notes;
  }
  else{
    return null;
  }
}

function mail_cat(file){
  if("d_mail_standard.txt" === file){
    return dMailStandard;
  }
  else{
    return null;
  }
}

function skuld_cat(file){
  if("operation_skuld.txt" === file){
    return ["TODO add operation_skuld.txt",];
  }
  else{
    return null;
  }
}

function main_cat(file){
  if(file==="company_welcome.txt"){
    return welcome_message;
  }
  else{
    return null;
  }
}

function gadget_club_cat(file){
  if(file == "investigation.txt"){
    return investigation;
  }
  else{
    return null;
  }
}

function phone_wave_cat(file){
  if(file == "research.txt"){
    return research;
  }
  else if(file == "schematic_overview.txt"){
    return schematic_overview;
  }
  else{
    return null;
  }
}
function gate_theory_cat(file){
  if(file == "gate_theory.txt"){
    return theory;
  }
  else{
    return null;
  }
}
function setUserPath(){

  if(isRoot){
    return "root@Evident"+current_path+"#>";
  }
  return "evident@Evident"+current_path+"~$>";

}

function getUser(){

  return setUserPath();

}

function enterKey(e) {
  if (e.keyCode == VOLUME_MUTE) {
    document.location.reload(true);
  }
  if (fillPasswordEnabled) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    if (e.keyCode == ENTER_KEY) {
      if (isPassword()){
        loopLines(secret, "output", 120);
        document.getElementById("liner").setAttribute("data-text", getUser());
      }else{
        addLine("Wrong password", "error", 0);
      }
      command.innerHTML = "";
      textarea.value = "";
      fillPasswordEnabled = false;
      liner.classList.remove("password");
    }
  } else {
    if (e.keyCode == ENTER_KEY) {
      commands.push(command.innerHTML);
      git = commands.length;
      addLine(getUser()+ " " + command.innerHTML, "no-animation", 0);//todo make variable for username
      console.log(command.innerHTML);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  //split command in space
  cd = cmd.split(" ")[0];
  file = cmd.split(" ")[1];
  if (cd === "cd"){
    if(!isRoot){
      addLine("default user has no cd permissions, auth: su", "error", 0);
    }
    else{
      // trim / from the end because the user might have typed it like that
      if (file == undefined){
        addLine("missing file operand", "error", 0);
        return;
      }
      if(file.endsWith("/")){
        file = file.substring(0, file.length - 1);
      }
      if(file === "1st_design"){
        current_path = "/1st_design";
        current_ls = designFiles;
        available_cat_function = design_cat;
        document.getElementById("liner").setAttribute("data-text", getUser());
      }
      else if(file === "skuld_files"){
        current_path = "/skuld_files";
        current_ls = skuldFiles;
        available_cat_function = skuld_cat;
        document.getElementById("liner").setAttribute("data-text", getUser());
      }
      else if(file === "mail_system"){
        current_path = "/mail_system";
        current_ls = mailFiles;
        available_cat_function = mail_cat;
        document.getElementById("liner").setAttribute("data-text", getUser());
      }
      else if(file === "futuregadgetlab"){
        current_path = "/FutureGadgetLab";
        current_ls = futureGadgetLab;
        console.log("entered here kldajf lkajds");
        available_cat_function = gadget_club_cat;
        document.getElementById("liner").setAttribute("data-text", getUser());
      }
      else if(file === "phone_wave"){
        current_path = "/phone_wave";
        current_ls = phone_wave;
        available_cat_function = phone_wave_cat;
        document.getElementById("liner").setAttribute("data-text", getUser());
      }
      else if(file === "gate_theory"){
        current_path = "/gate_theory";
        current_ls = gate_theory;
        available_cat_function = gate_theory_cat;
        document.getElementById("liner").setAttribute("data-text", getUser());
      }
      else if(file === "@channel"){
        addLine("DMAIL: request #$O&*3453w. This communication channel is directly connected to the d-mail service and <br> viewing it's contents can and will alter", "error", 80);
        addLine(" the current time continuum.<br> Only SERN executive members have view access.", "error", 80);
      }
      else if(file === "operation_skuld"){
        addLine("DMAIL: request #$(b*34h%*U@. The events described in this directory have not yet concluded with a favorable outcome<br>", "error", 80);
        addLine("viewing the files can and will make the search efforts increasingly more difficult.<br> Only SERN executive members have view access.", "error", 80);
      }
      else if(file == ".."){
        current_path = "";
        current_ls = ls;
        available_cat_function = main_cat;
        document.getElementById("liner").setAttribute("data-text", getUser());
      }
      else {
        addLine("No such directory", "error", 80);
      }
      /*
      setTimeout(function() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000);*/
   
    }
    return;
  }else if(cd === "cat"){
    if(!isRoot){
      addLine("default user has no cat permissions, auth: su", "error", 0);
    }
    else{
      if(file === undefined){
        addLine("No file specified", "error", 80);
      }
      else{
        var cat = available_cat_function(file);
        if(cat === null){
          addLine("No such file in system", "error", 80);
        }
        else{
          loopLines(cat, "output", 80);
        }
      }
    }
    return;
  }
  


  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "output", 80);
      break;
    case "whois":
      loopLines(whois, "output", 80);
      break;
    case "whoami":
      loopLines(whoami, "output", 80);
      break;
    case "video":
      addLine("Opening YouTube...", "color2", 80);
      newTab(youtube);
      break;
    case "sudo":
      addLine("/etc/sudoers not found", "output", 80);/*
      setTimeout(function() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000); */
      break;
    case "su":
      if (isRoot) {
        addLine("root is already authenticated", "output", 80);
        break;
      }
      liner.classList.add("password");
      fillPasswordEnabled = true;
      break;
    case "history":
      //addLine("<br>", "", 0);
      loopLines(commands, "output", 80);
      //addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "email":
      addLine('johntitor@dmail.com', "color2", 80);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "database":
      commander("default");// this command is not available to the default user for now
      if (!isRoot) {
        commander("default");
        break;
      }
      addLine("Accessing Database...", "color2", 0);
      setTimeout(function() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000);
      break;
    case "spec":
      loopLines(hardinfo, "output", 100);
      break;
    case "ls":
      loopLines(current_ls, "output", 100);
      break;
    default:
      addLine("<span class=\"inherit\">Unrecognized Command "+cmd+". try <span class=\"command\">'help'</span>.</span>", "error", 0);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}