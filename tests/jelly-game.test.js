import test from 'node:test';
import assert from 'node:assert/strict';
import { jellyInitial, jellyReducer as reduce } from '../src/components/jelly-game-model.js';
test('ice bath needs two taps and repeated ingredients cannot skip prep',()=>{
 let s=reduce(jellyInitial,{type:'START'});
 s=reduce(s,{type:'TAP'});assert.equal(s.step,2);
 s=reduce(s,{type:'TAP'});assert.equal(s.step,3);
 s=reduce(s,{type:'TAP'});assert.equal(s.step,3);assert.equal(s.iceCount,1);
 s=reduce(s,{type:'TAP'});assert.equal(s.step,4);
 s=reduce(s,{type:'TAP'});assert.equal(s.step,4);
 s=reduce(s,{type:'PREPARE',id:'garlic'});
 s=reduce(s,{type:'PREPARE',id:'garlic'});assert.equal(s.prepared.length,1);
 s=reduce(s,{type:'PREPARE',id:'unknown'});assert.equal(s.prepared.length,1);
 assert.equal(reduce(s,{type:'PREPARED'}).step,4);
 for(const id of ['pepper','cucumber','coriander'])s=reduce(s,{type:'PREPARE',id});
 assert.equal(s.step,4);assert.equal(s.prepared.length,4);
 s=reduce(s,{type:'PREPARED'});assert.equal(s.step,5);
 for(const step of [6,7,8]){s=reduce(s,{type:'TAP'});assert.equal(s.step,step);}
 assert.equal(reduce(s,{type:'TAP'}).step,8);
 assert.deepEqual(reduce(s,{type:'RESET'}),jellyInitial);
});
