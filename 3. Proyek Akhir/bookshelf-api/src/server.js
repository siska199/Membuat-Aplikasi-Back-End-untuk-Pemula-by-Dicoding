// Mengimport module @hapi/hapi yang digunakan sebagai framework backend
const Hapi = require('@hapi/hapi');
// Mengimport module routes.js yang berisi routing website yang akan kita buat,
const routes = require('./routes'); // modul routes.js kemudian disimpan pada variabel routes

const init = async () => {
  // Membuat server
  const server = Hapi.server({
    // Mendefinisikan nilai port dan host
    port: 5000,
    host: 'localhost',
    // Menerapkan CORS (cross-origin resource sharing) pada seluruh resource yang ada
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Membuat routing
  server.route(routes); // routes berisi routing yang diterapkan pada web service yang kita buat

  // Memulai server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri} `);
};

init();
