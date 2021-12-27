# Zonkey Storage - Virtual JSON Storage

Zonkey Storage is a simple way to store any information to any JSON file, these JSON files are named warehouse to represent a collection of items stored in them.

## Usage

To store a list of items you can use the following code, the files will be stored on a JSON file called "clothes.json" on the "./" directory.

```javascript
// The result will be true/false depending on whether the file could be saved.
const result = storage.store({ 
  warehouse: { name: 'clothes', location: './'}, 
  items: [
    { type: 'shirt', color: 'white'},
    { type: 'jeans', color: 'blue'},
    { type: 'shoes', color: 'gray'},
  ] 
});
```

To store a single item into a a warehouse you can use the following code:

```javascript
// The result will be true/false depending on whether the file could be saved.
const result = storage.store({
  warehouse: { name: 'clothes', location: './'}, 
  item: { type: 'shirt', color: 'black'} 
});
```

To find a single item in a warehouse you can use the following code:

```javascript
// The item will be null or will contain an object stored
const item = storage.find({
  warehouse: { 
    name: 'clothes', 
    location: './'
  }, 
  criteria: (item) => item.color === 'blue'
});
```

To retrieve all the contents of the warehouse you can use the following code:

```javascript
// This item list will contain all the data stored in the warehouse
const itemList = storage.retrieve({ 
  warehouse: { name: 'clothes', location: './'}, 
});
```

You can also specifiy some criteria for the items retrieved:

```javascript
// This item list will contain the data from the warehouse filtered by the criteria
const itemList = storage.retrieve({ 
  warehouse: { name: 'clothes', location: './'}, 
  criteria: (item) => item.type === 'shirt' 
});
```

If you want to burn a warehouse down (remove it) you can use the following command:

```javascript
// The result will be true/false depending on whether the warehouse could be deleted.
const result = storage.burn({
  warehouse: { name: 'clothes', location: './'} 
});
```
