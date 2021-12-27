/**
 * Zonkey Storage - Virtual JSON Storage
 */

const fs = require('fs');
const path = require('path');

/** Get warehouse path */
function getWarehousePath(warehouse) {
  const { name, location } = warehouse;
  return path.join(location, `${name}.json`);
}

/** Store functions */
function store({ warehouse, items, item }) {
  if (items) {
    return storeItems({ warehouse, items });
  } 
  else if (item) {
    return storeItem({ warehouse, item });
  }

  return false;
}

function storeItems({ warehouse, items }) {
  const warehousePath = getWarehousePath(warehouse);

  if (Array.isArray(items) && items.length) {
    fs.writeFileSync(warehousePath, JSON.stringify(items))
    return true;
  }

  return false;
}

function storeItem({ warehouse, item }) {
  const warehousePath = getWarehousePath(warehouse);

  if (item && fs.existsSync(warehousePath)) {
    const storedItems = [...retrieve({ warehouse }), item];
    fs.writeFileSync(warehousePath, JSON.stringify(storedItems))
    return true;
  }

  return false;
}

/** Find functions */
function find({ warehouse, criteria }) {
  const items = retrieve({ warehouse });
  return items.find(criteria);
}

/** Retrieve functions */
function retrieve({ warehouse, criteria }) {
  if (warehouse && !criteria) {
    return retrieveAll({ warehouse })
  }
  else if (warehouse && criteria) {
    return retrieveFiltered({ warehouse, criteria });
  }

  return [];
}

function retrieveAll({ warehouse }) {
  const warehousePath = getWarehousePath(warehouse);
  const storedData = fs.readFileSync(warehousePath);
  const parsedData = JSON.parse(storedData)

  if (Array.isArray(parsedData)) {
    return parsedData
  }
  
  return [];
}

function retrieveFiltered({ warehouse, criteria }) {
  return retrieveAll({ warehouse }).filter(criteria);
}

function burn({ warehouse }) {
  const warehousePath = getWarehousePath(warehouse);
  fs.unlinkSync(warehousePath);
  return true;
}

module.exports = {
  store,
  retrieve,
  find,
  burn,
}