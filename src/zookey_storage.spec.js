/**
 * Zonkey Storage - Virtual JSON Storage
 * 
 * Requirements:
 * - As a user I need to store warehouse (json files) with list of information.
 * - As a user I need to store items inside of a warehouse.
 * - As a user I need to be able to find an item inside a warehouse.
 * - As a user I need to retrieve warehouse easily.
 * - As a user I need to be able to filter the contents of a retrieved warehouse.
 * - As a user I need to destroy to burn (destroy) warehouse.
 */

const storage = require('./zonkey-storage');

test('As a user I need to store lists of information in json format on a JSON file easily', () => {
  const result = storage.store({ 
    warehouse: { name: 'clothes', location: './'}, 
    items: [
      { type: 'shirt', color: 'white'},
      { type: 'jeans', color: 'blue'},
      { type: 'shoes', color: 'gray'},
    ] 
  });
  expect(result).toBe(true);
})
 
test('As a user I need to store a item inside of list of information', () => {
  const result = storage.store({
    warehouse: { name: 'clothes', location: './'}, 
    item: { type: 'shirt', color: 'black'} 
  });
  expect(result).toBe(true);
})

test('As a user I need to be able to find an item inside a warehouse', () => {
  const item = storage.find({
    warehouse: { 
      name: 'clothes', 
      location: './'
    }, 
    criteria: (item) => item.color === 'blue'
  });
  expect(item).toStrictEqual({ color: 'blue', type: 'jeans'} );
})

test('As a user I need to retrieve lists of information in json format easily.', () => {
  const itemList = storage.retrieve({ 
    warehouse: {
      name: 'clothes', 
      location: './'
    } 
  });
  expect(itemList).toStrictEqual([
    { type: 'shirt', color: 'white'},
    { type: 'jeans', color: 'blue'},
    { type: 'shoes', color: 'gray'},
    { type: 'shirt', color: 'black'}
  ]);
})

test('As a user I need to be able to filter the contents of a retrieved package.', () => {
  const itemList = storage.retrieve({ 
    warehouse: { name: 'clothes', location: './'}, 
    criteria: (item) => item.type === 'shirt' 
  });
  expect(itemList).toStrictEqual([
    { type: 'shirt', color: 'white'}, 
    { type: 'shirt', color: 'black'}
  ]);
})

test('As a user I need to destroy the stored information in json format.', () => {
  const result = storage.burn({ warehouse: { name: 'clothes', location: './'} });
  expect(result).toBe(true);
})