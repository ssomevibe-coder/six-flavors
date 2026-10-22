export const steps = [
  '一杯柠檬茶的诞生', '砧板上切柠檬', '锤柠檬', '加冰', '锤冰与柠檬',
  '倒入茶与糖', '摇匀雪克杯', '倒入杯中', '垫纸与盖杯盖', '打包带走', '柠檬茶，做好了',
];
export const initialGame = { step: 0, count: 0, cuts: [], paper: false, lid: false };
export const tapGoals = { 2: 3, 3: 1, 4: 3, 5: 1, 6: 1, 7: 1, 9: 3 };
export function cutDirection(start, end) {
  const dx = Math.abs(end.x - start.x), dy = Math.abs(end.y - start.y);
  // The gesture must cross the lemon, not merely move somewhere on the board.
  if (dx >= 45 && dx > dy * 1.6 && Math.min(start.x, end.x) < 175 && Math.max(start.x, end.x) > 185 && start.y >= 110 && start.y <= 210 && end.y >= 110 && end.y <= 210) return 'horizontal';
  if (dy >= 45 && dy > dx * 1.6 && Math.min(start.y, end.y) < 155 && Math.max(start.y, end.y) > 165 && start.x >= 125 && start.x <= 235 && end.x >= 125 && end.x <= 235) return 'vertical';
  return null;
}
export function isLidDrop(point) { return point.x >= 115 && point.x <= 245 && point.y >= 85 && point.y <= 155; }
export function gameReducer(state, action) {
  if (action.type === 'RESET') return { ...initialGame, cuts: [], step: action.start ? 1 : 0 };
  if (action.type === 'START' && state.step === 0) return { ...state, step: 1 };
  if (action.type === 'CUT' && state.step === 1 && ['horizontal', 'vertical'].includes(action.direction) && !state.cuts.includes(action.direction)) return { ...state, cuts: [...state.cuts, action.direction] };
  if (action.type === 'CUT_DONE' && state.step === 1 && state.cuts.length === 2) return { ...state, step: 2 };
  if (action.type === 'TAP' && tapGoals[state.step]) {
    const count = state.count + 1;
    return count >= tapGoals[state.step] ? { ...state, step: state.step + 1, count: 0 } : { ...state, count };
  }
  if (action.type === 'PLACE' && state.step === 8) {
    if (action.item === 'paper' && !state.paper) return { ...state, paper: true };
    if (action.item === 'lid' && state.paper && !state.lid) return { ...state, lid: true };
  }
  if (action.type === 'SEAL_DONE' && state.step === 8 && state.paper && state.lid) return { ...state, step: 9 };
  return state;
}
