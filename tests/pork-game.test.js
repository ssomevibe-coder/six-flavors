import test from 'node:test';
import assert from 'node:assert/strict';
import {porkInitial,porkReducer as reduce,porkActions} from '../src/components/pork-game-model.js';
test('each ordered action needs exactly one click, including oil/pepper/toss and fry/broth',()=>{
 let s=reduce(porkInitial,{type:'START'});
 const counts=[2,1,1,3,1,2,1];
 for(let step=1;step<=7;step++)for(let i=0;i<counts[step-1];i++){
  assert.equal(s.step,step);assert.equal(s.action,i);s=reduce(s,{type:'TAP'});
 }
 assert.equal(s.step,8);assert.equal(reduce(s,{type:'TAP'}).step,8);
 assert.deepEqual(reduce(s,{type:'RESET'}),porkInitial);
 assert.deepEqual(porkActions[4].map(a=>a.name),['下油','下青椒','翻炒青椒']);
 assert.deepEqual(porkActions[6].map(a=>a.name),['蒜香爆炒','加入原汤焖煮']);
});
