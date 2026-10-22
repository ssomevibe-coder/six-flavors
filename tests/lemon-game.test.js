import test from 'node:test';
import assert from 'node:assert/strict';
import { gameReducer as reduce, initialGame, cutDirection, isLidDrop } from '../src/components/lemon-game-model.js';
test('cuts require two distinct directions across the actual lemon',()=>{
  assert.equal(cutDirection({x:80,y:160},{x:280,y:160}),'horizontal');
  assert.equal(cutDirection({x:180,y:70},{x:180,y:250}),'vertical');
  assert.equal(cutDirection({x:10,y:20},{x:300,y:20}),null);
  assert.equal(cutDirection({x:170,y:160},{x:185,y:161}),null);
  assert.equal(cutDirection({x:80,y:70},{x:280,y:260}),null);
  let s=reduce(initialGame,{type:'START'});
  s=reduce(s,{type:'CUT',direction:'horizontal'});
  s=reduce(s,{type:'CUT',direction:'horizontal'});
  assert.equal(s.cuts.length,1);assert.equal(reduce(s,{type:'CUT_DONE'}).step,1);
});
test('complete recipe enforces tap counts, paper-before-lid, and all three packing actions',()=>{
  let s=reduce(initialGame,{type:'START'});
  for(const direction of ['vertical','horizontal'])s=reduce(s,{type:'CUT',direction});
  s=reduce(s,{type:'CUT_DONE'});assert.equal(s.step,2);
  for(const [step,count] of [[2,3],[3,1],[4,3],[5,1],[6,1],[7,1]]){
    for(let i=1;i<=count;i++){s=reduce(s,{type:'TAP'});assert.equal(s.step,i===count?step+1:step);}
  }
  s=reduce(s,{type:'PLACE',item:'lid'});assert.equal(s.lid,false);
  s=reduce(s,{type:'TAP'});assert.equal(s.step,8);
  s=reduce(s,{type:'PLACE',item:'paper'});assert.equal(s.paper,true);
  assert.equal(reduce(s,{type:'SEAL_DONE'}).step,8);
  s=reduce(s,{type:'PLACE',item:'lid'});s=reduce(s,{type:'SEAL_DONE'});assert.equal(s.step,9);
  for(let i=1;i<=3;i++){s=reduce(s,{type:'TAP'});assert.equal(s.step,i===3?10:9);}
  assert.deepEqual(reduce(s,{type:'RESET'}),initialGame);
});
test('drop zone rejects tray and cup base',()=>{
  assert.ok(isLidDrop({x:180,y:115}));assert.equal(isLidDrop({x:180,y:270}),false);assert.equal(isLidDrop({x:55,y:115}),false);
});
