/* eslint-disable no-unneeded-ternary */
const pageCount = 10;
const readPage = 10;
// eslint-disable-next-line eqeqeq
const finished = (pageCount == readPage) ? true : false;

console.log(finished);

const object = {
  siska: 'siska',
  nama: 'siska',
};
const isEmpty = !Object.values(object).every((x) => x === null || x === '');
console.log(isEmpty);

const numbers = [65, 44, 12, 4];
numbers.forEach(myFunction);

function myFunction(item, index, arr) {
  arr[index] = item * 10;
}
console.log(numbers);

const test = [
  {
    id: 'QivdpEuOS0YtjK51',
    name: 'buku',
    publisher: 'Dicoding Indonesia',
  },
  {
    id: 'sIFjuff97aqEB0AM',
    name: 'siska',
    publisher: 'Dicoding Indonesia',
  },
];

const name = 'siska';
function filterByName(book) {
  if (book.name == name) {
    console.log('ini buku yang kefilter', book);
    return book;
  }
}

const bookkk = test.filter(filterByName);
console.log('Get buku berdasarkan name query: ', bookkk);

const num = 0;
if (num.toString()) {
  console.log('Cek: ', num.toString());
}
