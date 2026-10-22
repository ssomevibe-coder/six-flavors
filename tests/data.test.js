import test from 'node:test';
import assert from 'node:assert/strict';
import { dishes, modalTypes, findDish, findModal } from '../src/data.js';
test('six dishes have unique, URL-safe ids and four content payloads', () => {
  assert.equal(dishes.length, 6); assert.equal(new Set(dishes.map(d => d.id)).size, 6);
  for (const d of dishes) { assert.match(d.id, /^[a-z-]+$/); assert.equal(findDish(d.id), d); for(const key of ['ingredients','game','article','video']) assert.ok(d[key]); }
});
test('four modal routes resolve and invalid ids do not', () => {
  assert.deepEqual(modalTypes.map(m=>m.id), ['gallery','game','article','video']);
  for (const m of modalTypes) assert.equal(findModal(m.id),m);
  assert.equal(findModal('unknown'),undefined); assert.equal(findDish('unknown'),undefined);
});
