import { Text, GridRow } from '@hamburger/core';

const items = [
  {
    title: 'React',
    status: 'Learning'
  },
  {
    title: 'Vue',
    version: 'Learning'
  },
  {
    title: 'Elm',
    version: 'Try Later'
  },
  {
    title: 'Angular',
    version: 'Try Later'
  }
];

const ItemStyle = {
  backgroundColor: 'gray',
  borderRadius: 4,
  textAlign: "center",
  color: "white"
};
export default function() {
  return GridRow(
    items.map(i => Text(i.title).style(ItemStyle))
  ).mapItem(i => i.take(1 / 3));
}
