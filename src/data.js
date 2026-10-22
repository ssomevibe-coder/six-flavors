import { authoredContent } from './authored-content.js';
// Supplied articles are live; gallery, process and video remain placeholders.
export const dishes = [
  { id: 'jellyfish', category: '前菜', name: '凉拌海蜇头' },
  { id: 'lemon-tea', category: '饮品', name: '柠檬茶' },
  { id: 'pepper-pork', category: '主菜', name: '青椒拆骨肉' },
  { id: 'pumpkin-pasta', category: '主食', name: 'Zuuca南瓜意面' },
  { id: 'vegetable-tea', category: '小吃', name: '菜茶' },
  { id: 'chocolate-cake', category: '甜品', name: '朱古力心太软' },
].map(dish => ({ ...dish, ...authoredContent[dish.id],
  ingredients: [{ id: 'a', name: '原材料 A', image: null }, { id: 'b', name: '原材料 B', image: null }, { id: 'c', name: '原材料 C', image: null }],
  game: { steps: ['步骤 A', '步骤 B', '步骤 C'] },
  video: { src: null, poster: null, captions: null, title: '多媒体资料' },
}));
export const modalTypes = [
  { id: 'gallery', title: '原材料图库', label: '01' },
  { id: 'game', title: '制作流程', label: '02' },
  { id: 'article', title: '文章阅读', label: '03' },
  { id: 'video', title: '多媒体资料', label: '04' },
];
export const findDish = id => dishes.find(dish => dish.id === id);
export const findModal = id => modalTypes.find(modal => modal.id === id);
