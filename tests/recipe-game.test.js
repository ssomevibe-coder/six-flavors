import test from 'node:test';
import assert from 'node:assert/strict';
import {recipes,recipeInitial,recipeReducer} from '../src/components/recipe-game-model.js';
for(const [id,counts] of Object.entries({'pumpkin-pasta':[0,1,3,1,1,1],'vegetable-tea':[2,4,2,2,3],'chocolate-cake':[2,3,3,3,1,1]}))test(`${id} exact action counts, order, completion and replay`,()=>{
 const recipe=recipes[id],reduce=(s,e)=>recipeReducer(recipe,s,e);let s=reduce(recipeInitial,{type:'START'});
 for(let i=0;i<counts.length;i++){
 assert.equal(s.step,i+1);
 if(!counts[i]){assert.deepEqual(reduce(s,{type:'TAP'}),s);s=reduce(s,{type:'CUT',direction:'horizontal'});assert.deepEqual(reduce(s,{type:'CUT',direction:'horizontal'}),s);assert.equal(reduce(s,{type:'CUT_DONE'}).step,1);s=reduce(s,{type:'CUT',direction:'vertical'});s=reduce(s,{type:'CUT_DONE'});}
 else for(let j=0;j<counts[i];j++){assert.equal(s.step,i+1);assert.equal(s.action,j);s=reduce(s,{type:'TAP'});}
 }
 assert.equal(s.step,counts.length+1);assert.deepEqual(reduce(s,{type:'TAP'}),s);assert.deepEqual(reduce(s,{type:'RESET'}),recipeInitial);assert.equal(reduce(s,{type:'RESET',start:true}).step,1);
});
