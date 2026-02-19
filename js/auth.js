const Auth={
login(){
let id=document.getElementById("loginId").value;
let pw=document.getElementById("password").value;
if(!id||!pw)return alert("Fill all fields");
Storage.save("user",{id});
if(document.getElementById("rememberMe").checked)
Storage.save("remember",true);
UI.init();
},
logout(){
localStorage.clear();
location.reload();
}
};
window.onload=()=>{
if(Storage.load("user"))UI.init();
};