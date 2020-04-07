function withCount(itemList) {
  return itemList.map((i) => ({ ...i, count: 0, checked: true }));
}

const ItemList = withCount([
  {
    id: 0,
    name: 'iPhone 11',
    price: '8999',
  },
  {
    id: 1,
    name: 'iPad Pro',
    price: '4999',
  },
  {
    id: 2,
    name: 'Airpods pro',
    price: '1999',
  },
  {
    id: 3,
    name: '橘子',
    price: '5',
  },
  {
    id: 4,
    name: '苹果',
    price: '3',
  },
]);

export { ItemList };
