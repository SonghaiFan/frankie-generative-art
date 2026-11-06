// Real archive metadata, extracted from visual_styles at build time; no AI/network/storage.
const data=JSON.parse(document.querySelector('#anchor-data').textContent);
const selected=new Set(),buttons=[...document.querySelectorAll('[data-anchor]')];
function render(){
 buttons.forEach(b=>b.setAttribute('aria-pressed',String(selected.has(b.dataset.anchor))));
 const values=data.samples.filter(s=>selected.has(s.id));
 document.querySelector('#selection-status').textContent=values.length?data.selected+': '+values.map(s=>s.name+' ['+s.tags.join(', ')+']').join(' / '):data.empty;
 document.querySelector('#clear').disabled=!selected.size;
}
buttons.forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.anchor;if(selected.has(id))selected.delete(id);else if(selected.size<3)selected.add(id);render();}));
document.querySelector('#clear').addEventListener('click',()=>{selected.clear();render();});render();
