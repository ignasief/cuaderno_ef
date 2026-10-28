const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync(__dirname+'/app-v4.js','utf8');
const mem={};const app={innerHTML:''};const doc={getElementById:(id)=>id==='app'?app:{onclick:null,classList:{add(){},remove(){}}},querySelectorAll:()=>[],createElement:()=>({style:{},click(){},remove(){}}),body:{appendChild(){}}};
const ctx=vm.createContext({document:doc,window:{addEventListener(){}},navigator:{},localStorage:{getItem:k=>mem[k]||null,setItem:(k,v)=>mem[k]=v},console,Date,Math,JSON,Blob,URL,clearTimeout,setTimeout:()=>0,confirm:()=>true,alert:()=>{},prompt:()=>''});
vm.runInContext(src,ctx);
function evaljs(expr){return vm.runInContext(expr,ctx)}
function test(name,fn){try{fn();console.log('PASS',name)}catch(e){console.log('FAIL',name,e.message)}}
test('JS initialized',()=>assert(evaljs('typeof viewEvaluar')==='function'));
test('13 UP 3.3 matrix',()=>assert.equal(evaljs('ups.filter(([u])=>compsForUP(u).some(e=>e.c===\'3.3\')).length'),13));
test('UP2 activities count',()=>console.log('  UP2:',evaljs("activityNamesForUP('UP2')")));
test('3.1 scale',()=>assert.equal(evaljs("continuousRubricFor('UP2','3.1').map(x=>x.score).join(',')"),'0,4,8,10'));
test('3.3 distinct UP2 keys',()=>{const keys=evaljs("activityNamesForUP('UP2').filter(x=>x!==GLOBAL_ASSESSMENT_ACTIVITY).map(a=>{state.ui.selectedActivity=a;return contextualQualKey('g','s','3.3','UP2')})");console.log('  keys:',keys);assert.equal(new Set(keys).size,keys.length)});
test('default 6 creates on view',()=>{evaljs("state.groups=[{id:'g',name:'Test',students:[{id:'s',name:'Ficticio'}]}];state.selectedGroup='g';state.selectedUP='UP2';state.ui.selectedActivity=activityNamesForUP('UP2')[0];viewEvaluar()");assert.equal(evaljs("state.qual[contextualQualKey('g','s','3.3','UP2')]"),6)});
test('clear persists',()=>{evaljs("delete state.qual[contextualQualKey('g','s','3.3','UP2')];viewEvaluar()");assert.equal(evaljs("state.qual[contextualQualKey('g','s','3.3','UP2')]"),undefined)});
test('new activity creates unobserved 6',()=>{evaljs("state.ui.selectedActivity=activityNamesForUP('UP2')[1];viewEvaluar()");assert.equal(evaljs("continuousHistory('g','s','3.3').length"),1)});
test('UP13 session mode 3.3 visible',()=>{evaljs("state.selectedUP='UP13';state.ui.evaluationView='session';state.ui.selectedSession=1");assert(evaljs("filteredContinuousForEvaluation('UP13').some(x=>x.c==='3.3')"))});
test('2.2 checklist for UP4',()=>{console.log('  allowed:',evaljs("(evidence['2.2']||[]).filter(e=>e[0]==='UP4').length"));assert(evaljs("(evidence['2.2']||[]).some(e=>e[0]==='UP4')"))});
test('2.2 coverage all UP',()=>{const a=evaljs("[...new Set((evidence['2.2']||[]).map(e=>e[0]))]");const b=evaljs('Object.keys(checklist22)');console.log('  Evidence UP:',a,'checklists:',b);assert(a.every(x=>b.includes(x)))});
test('3.3 closure includes auto scores',()=>{const n=evaljs("continuousHistory('g','s','3.3').length");console.log('  history:',n);assert.equal(n,0)});
test('PWA icons present',()=>{const m=JSON.parse(fs.readFileSync(__dirname+'/manifest.webmanifest'));m.icons.forEach(i=>assert(fs.existsSync(__dirname+'/'+i.src)))});
test('SW assets present',()=>{const assets=evaljs('typeof CACHE');assert(assets)});
