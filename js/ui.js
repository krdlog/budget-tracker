const UI={
init(){
document.getElementById("loginPage").classList.add("hidden");
document.getElementById("app").classList.remove("hidden");
document.getElementById("welcomeUser").innerText="Welcome";
App.init();
},
toggleMenu(){
document.getElementById("menuDropdown").classList.toggle("hidden");
},
toggleSidebar(){
document.getElementById("sidebar").classList.toggle("hidden");
}
};