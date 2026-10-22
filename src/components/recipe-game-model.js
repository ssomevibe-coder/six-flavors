const action=(name,motion='drop',food='')=>({name,motion,food});
export const recipes={
 'pumpkin-pasta':{name:'Zuuca南瓜意面',intro:'把秋日的暖意，盛进一只南瓜碗。',steps:[
 {title:'处理南瓜',cut:true,actions:[]},
 {title:'烤熟南瓜备用',actions:[action('南瓜放入烤箱烤熟','roast','pumpkin-chunks')]},
 {title:'煮面，留下半碗面水',actions:[action('放入意面','drop','noodle'),action('加入盐','sprinkle','salt'),action('盛出半碗煮面水','scoop','water')]},
 {title:'熬制芝士奶油酱',actions:[action('熬制芝士奶油酱','stir','cream')]},
 {title:'面和酱融合乳化',actions:[action('将意面倒入酱锅','pour','noodle')]},
 {title:'装盘并装饰',actions:[action('将意面倒入南瓜碗','serve','noodle')]}
 ]},
 'vegetable-tea':{name:'菜茶',intro:'一碗热汤，聚起米香与家常。',steps:[
 {title:'熬汤底',actions:[action('猪筒骨入砂锅焯水','drop','bone'),action('放入姜葱米酒','pour','aromatics')]},
 {title:'切备料',actions:[action('切青菜','chop','greens'),action('剪虾米','snip','shrimp'),action('剪鱿鱼','snip','squid'),action('猪肉腊肠切丁','chop','meat')]},
 {title:'炒出米香',actions:[action('干锅慢炒糯米至膨胀金黄','toast','rice'),action('加入花生炒酥','toss','peanut')]},
 {title:'快炒青菜',actions:[action('炒海味肉丁','toss','meat'),action('下青菜快炒','toss','greens')]},
 {title:'组装冲汤',actions:[action('捞起锅中所有食材','scoop','greens'),action('撒上炒米花生','sprinkle','peanut'),action('冲入滚烫骨汤','pour','water')]}
 ]},
 'chocolate-cake':{name:'朱古力心太软',intro:'从一块巧克力，到一颗温热的心。',steps:[
 {title:'融化巧克力',actions:[action('巧克力和黄油隔热水融化','melt','chocolate'),action('搅拌至顺滑无颗粒','stir','chocolate')]},
 {title:'打发鸡蛋',actions:[action('打入两颗鸡蛋','drop','egg'),action('加入白砂糖','sprinkle','salt'),action('打蛋器打发白霜','whisk','foam')]},
 {title:'混合面糊',actions:[action('筛入低筋面粉','sift','flour'),action('第一次刮刀翻拌面糊','fold','batter'),action('第二次刮刀翻拌面糊','fold','batter')]},
 {title:'加入巧克力酱',actions:[action('将巧克力酱倒入面糊','pour','chocolate'),action('第一次刮刀翻拌','fold','chocolate'),action('第二次刮刀翻拌','fold','chocolate')]},
 {title:'挤入心形模具',actions:[action('将巧克力面糊倒入心形模具','pour','chocolate')]},
 {title:'烘烤',actions:[action('送入烤箱，烘烤后出炉','bake','cake')]}
 ]}
};
export const recipeInitial={step:0,action:0,cuts:[]};
export function recipeReducer(recipe,state,event){
 if(event.type==='RESET')return {...recipeInitial,cuts:[],step:event.start?1:0};
 if(event.type==='START'&&state.step===0)return {...state,step:1};
 const step=recipe.steps[state.step-1];
 if(!step)return state;
 if(event.type==='CUT'&&step.cut&&['horizontal','vertical'].includes(event.direction)&&!state.cuts.includes(event.direction))return {...state,cuts:[...state.cuts,event.direction]};
 if(event.type==='CUT_DONE'&&step.cut&&state.cuts.length===2)return {...state,step:state.step+1,action:0};
 if(event.type==='TAP'&&!step.cut)return state.action+1===step.actions.length?{...state,step:state.step+1,action:0}:{...state,action:state.action+1};
 return state;
}
