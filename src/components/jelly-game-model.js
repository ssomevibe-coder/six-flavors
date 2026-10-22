export const jellySteps = ['清爽的开场', '浸泡去沙脱盐', '微沸焯水', '过冰水，沥干', '准备四种辅料', '调酸香汁', '拌匀入味', '冰盘装盘', '凉拌海蜇头，做好了'];
export const ingredients = [{ id: 'coriander', name: '香菜' }, { id: 'pepper', name: '红椒' }, { id: 'cucumber', name: '黄瓜' }, { id: 'garlic', name: '蒜蓉' }];
export const jellyInitial = { step: 0, iceCount: 0, prepared: [] };
export function jellyReducer(state, action) {
  if (action.type === 'RESET') return { ...jellyInitial, prepared: [], step: action.start ? 1 : 0 };
  if (action.type === 'START' && state.step === 0) return { ...state, step: 1 };
  if (action.type === 'TAP') {
    if (state.step === 3) return state.iceCount === 0 ? { ...state, iceCount: 1 } : { ...state, step: 4, iceCount: 2 };
    if ([1,2,5,6,7].includes(state.step)) return { ...state, step: state.step + 1 };
  }
  if (action.type === 'PREPARE' && state.step === 4 && ingredients.some(item=>item.id===action.id) && !state.prepared.includes(action.id)) return { ...state, prepared: [...state.prepared, action.id] };
  if (action.type === 'PREPARED' && state.step === 4 && state.prepared.length === 4) return { ...state, step: 5 };
  return state;
}
