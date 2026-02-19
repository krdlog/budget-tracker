let transactions=[];
let chart;

const App={
init(){
transactions=Storage.load("transactions")||[];
this.render();
},
addTransaction(){
let desc=document.getElementById("desc").value;
let amount=parseFloat(document.getElementById("amount").value);
let type=document.getElementById("type").value;
let category=document.getElementById("category").value;
if(!desc||!amount)return;
transactions.push({desc,amount,type,category,date:Date.now()});
Storage.save("transactions",transactions);
this.render();
},
render(){
let income=0,expense=0;
let list=document.getElementById("txList");
list.innerHTML="";
transactions.forEach((t,i)=>{
if(t.type==="income")income+=t.amount;
else expense+=t.amount;
let li=document.createElement("li");
li.innerHTML=`${t.category} ${t.desc} - KES ${t.amount.toFixed(2)}
<button onclick="App.deleteTx(${i})">Delete</button>`;
list.appendChild(li);
});
document.getElementById("income").innerText="KES "+income.toFixed(2);
document.getElementById("expense").innerText="KES "+expense.toFixed(2);
document.getElementById("balance").innerText="KES "+(income-expense).toFixed(2);
this.drawChart(income,expense);
},
deleteTx(i){
if(!confirm("Backup will download before delete. Continue?"))return;
this.exportData();
transactions.splice(i,1);
Storage.save("transactions",transactions);
this.render();
},
sortTransactions(type){
if(type==="newest")transactions.sort((a,b)=>b.date-a.date);
if(type==="oldest")transactions.sort((a,b)=>a.date-b.date);
if(type==="amount")transactions.sort((a,b)=>b.amount-a.amount);
this.render();
},
exportData(){
let data=JSON.stringify(transactions);
let blob=new Blob([data],{type:"application/json"});
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="backup.json";
a.click();
},
resetData(){
if(confirm("Reset all data?")){localStorage.clear();location.reload();}
},
drawChart(income,expense){
let ctx=document.getElementById("chart");
if(chart)chart.destroy();
chart=new Chart(ctx,{type:"line",
data:{labels:["Income","Expense"],
datasets:[{data:[income,expense]}]},
options:{plugins:{legend:{display:false}}}
});
}
};