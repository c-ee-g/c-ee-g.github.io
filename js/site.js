// Small JS used to mimic a hit counter increment locally
document.addEventListener('DOMContentLoaded',function(){
try{
var el=document.getElementById('visitors');
if(!el) return;
var n=parseInt(localStorage.getItem('pd_visitors')||el.textContent||'0',10);
n = isNaN(n)? 0 : n+1;
localStorage.setItem('pd_visitors',n);
el.textContent = n.toString();
}catch(e){ /* ignore */ }
});
