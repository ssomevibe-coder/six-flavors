export const porkSteps = ['一锅热气，一份家常', '清洗食材', '焯水去腥', '捞出放凉', '煸香青椒', '剔下骨肉', '蒜香爆炒，原汤焖煮', '大火收汁，装盘', '青椒拆骨肉，做好了'];
export const porkActions = {
  1: [{name:'清洗青椒',animation:'wash-pepper'},{name:'清洗龙骨',animation:'wash-bone'}],
  2: [{name:'龙骨与姜葱蒜下锅',animation:'blanch'}],
  3: [{name:'漏网捞出龙骨',animation:'lift'}],
  4: [{name:'下油',animation:'oil'},{name:'下青椒',animation:'pepper'},{name:'翻炒青椒',animation:'toss'}],
  5: [{name:'剔下骨肉',animation:'debone'}],
  6: [{name:'蒜香爆炒',animation:'fry'},{name:'加入原汤焖煮',animation:'broth'}],
  7: [{name:'大火收汁并装盘',animation:'plate'}],
};
export const porkInitial = {step:0,action:0};
export function porkReducer(state,event){
  if(event.type==='RESET')return {...porkInitial,step:event.start?1:0};
  if(event.type==='START'&&state.step===0)return {step:1,action:0};
  if(event.type==='TAP'&&porkActions[state.step])return state.action+1===porkActions[state.step].length?{step:state.step+1,action:0}:{...state,action:state.action+1};
  return state;
}
