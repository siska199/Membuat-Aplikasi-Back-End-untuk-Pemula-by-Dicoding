/* eslint-disable no-undef */
/* eslint-disable no-else-return */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-unneeded-ternary */

// Mengimport module nanoid untuk membuat id
const { nanoid } = require('nanoid');
// Mengimport data list book dari modul books.js
const { books } = require('./books');

// 1. Membuat fungsi untuk menambah buku
// eslint-disable-next-line consistent-return
const addBookHandler = (request, h) => {
  // Mengambil data yang diberikan client pada saat membuat buku
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  // Membuat data dari buku di server secara default
  const id = nanoid(16);
  const finished = (pageCount == readPage) ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // Membuat variabel untuk menampung data buku yang baru ditambahkan
  const newBook = {
    name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt,
  };

  // Mengecek apakah ada data yang kosong:
  const isComplete = !Object.values(newBook).every((data) => data === null || data === '');
  console.log('Apakah data Lengkap? ', isComplete);
  console.log('Buku yang ditambahkan: ', newBook);

  // Membuat response untuk keberhasilan/kegagalan request menambahkan buku baru
  if (!name) { // Response ketika client tidak mengimputkan nama buku
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) { // Response ketika readPage > pageCount
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  } else if (isComplete) { // Response ketika client berhasil menambahkan buku
    // Memasukkan data buku baru (newBook) kedalam variabel books
    books.push(newBook);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else { // Response ketika terjadi internal error dari server
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(500);
  }
};

// 2. Membuat fungsi handler untuk dapat menampilkan seluruh buka
const getAllBookHandler = (request, h) => {
  // variabel sumBook untuk menyimpan data buku yang hanya memiliki tiga properti
  const sumBooks = [];

  // eslint-disable-next-line no-restricted-syntax
  for (data of books) {
    sumBooks.push({
      id: data.id,
      name: data.name,
      publisher: data.publisher,
    });
  }

  console.log('Data dari get all book', sumBooks);

  // Menambahkan fitur query parameters
  const { name, reading, finished } = request.query;
  console.log('name query: ', name);

  // Response ketika melakukan query berdasarkan nama
  if (name) {
    // Membuat variabel name yang berupa string menjadi regex expression:
    const matchName = new RegExp(name, 'g');
    // Menfilter buku berdasarkan nama:
    const bookByName = sumBooks.filter((book) => book.name.match(matchName));
    console.log('Get buku berdasarkan name query: ', bookByName);

    const response = h.response(
      {
        status: 'success',
        data: {
          books: bookByName, // Mengambil data dari variabel books yang kita import
        },
      },
    );
    response.code(200);
    return response;
  } else if (reading != undefined) {
    const bookByReading = [];

    // eslint-disable-next-line no-restricted-syntax
    for (data of books) {
      if (data.reading == reading) {
        bookByReading.push({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        });
      }
    }
    console.log('Get buku berdasarkan reading query: ', bookByReading);

    const response = h.response(
      {
        status: 'success',
        data: {
          books: bookByReading, // Mengambil data dari variabel books yang kita import
        },
      },
    );
    response.code(200);
    return response;
  } else if (finished != undefined) {
    const bookByFinished = [];

    // eslint-disable-next-line no-restricted-syntax
    for (data of books) {
      if (data.finished == finished) {
        bookByFinished.push({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        });
      }
    }
    console.log('Get buku berdasarkan finished query: ', bookByFinished);
    const response = h.response(
      {
        status: 'success',
        data: {
          books: bookByFinished, // Mengambil data dari variabel books yang kita import
        },
      },
    );
    response.code(200);
    return response;
  } else {
    const response = h.response(
      {
        status: 'success',
        data: {
          books: sumBooks, // Mengambil data dari variabel books yang kita import
        },
      },
    );
    response.code(200);
    return response;
  }
};

// 3. Membuat fungsi handler untuk dapat menampilkan detail buku
// eslint-disable-next-line consistent-return
const getBookByIdHandler = (request, h) => {
  // Mengambil parameter id dari buku yang ingin ditampilkan
  const { bookId } = request.params;
  // Mencari buku dengan berdasarkan parameter id yang ditentukan
  const book = books.filter((b) => b.id === bookId)[0]; // b adalah anggota dari list books
  console.log('Nilai index dari buku yang ditemukan', book);

  // Membuat response untuk keberhasilan/kegagalan request mencari buku dengan id yang diinputkan client
  if (book != undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return (response);
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// 4. Membuat fungsi handler untuk dapat mengubah data buku
// eslint-disable-next-line consistent-return
const editBookByIdHandler = (request, h) => {
  // Mengambil parameter id dari buku yang ingin ditampilkan
  const { bookId } = request.params;
  // Mengambil data yang diberikan client pada saat mengedit buku
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  // Mengapdate tanggal updatedAt
  const updatedAt = new Date().toISOString();

  // Cek id buku apakah ada di list daftar buku pada variable book
  // eslint-disable-next-line no-shadow
  console.log('id-nya', bookId);
  const index = books.findIndex((book) => book.id == bookId);
  console.log('Nilai index dari buku yang akan diedit: ', index);
  // Membuat response untuk kegagalan/keberhasilan request memperbarui buku
  if (!name) { // Response ketika client tidak mengimputkan nama buku
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) { // Response ketika readPage > pageCount
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  } else if (index == -1) { // Response ketika buku dengan id yang diberikan tidak ditemukan
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  } else { // Response ketika buku berhasil di edit
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    // Menampilkan data buku yang baru diedit
    console.log('Data buku yang baru diedit', books[index]);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
};

// 5. Membuat fungsi handler untuk dapat menghapus buku
const deleteBookByIdHandler = (request, h) => {
  // Mengambil parameter id dari buku yang ingin ditampilkan
  const { bookId } = request.params;
  // Cek id buku apakah ada di list daftar buku pada variable book
  // eslint-disable-next-line no-shadow
  console.log('id-nya', bookId);
  const index = books.findIndex((book) => book.id == bookId);

  // Membuat response untuk kegagalan/keberhasilan request mendelete buku
  if (index != -1) { // Response ketika buku berhasil dihapus
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  } else { // Response ketika buku tidak berhasil dihapus
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  // Menghapus data buku dari list buku (books)
};

module.exports = {
  addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler,
};
