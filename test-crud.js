const base = 'http://localhost:8081';
const log = console.log;
async function testCliente() {
  log('--- cliente CRUD ---');
  let resp = await fetch(`${base}/api/customer/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: 'TestCliente', apellido: 'User', direccion: 'Local', correo: 'testcliente@mail.com', telefono: '123456789' })
  });
  let data = await resp.json();
  log('POST cliente', resp.status, data);
  const id = data.id;
  resp = await fetch(`${base}/api/customer/`);
  data = await resp.json();
  log('GET clientes', resp.status, Array.isArray(data) ? data.length : data);
  resp = await fetch(`${base}/api/customer/${id}`);
  data = await resp.json();
  log('GET cliente by id', resp.status, data);
  resp = await fetch(`${base}/api/customer/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ direccion: 'Actualizado' })
  });
  data = await resp.json();
  log('PUT cliente', resp.status, data);
  resp = await fetch(`${base}/api/customer/delete/${id}`, {
    method: 'DELETE'
  });
  data = await resp.json();
  log('DELETE cliente', resp.status, data);
}
async function testTutorial() {
  log('--- tutorial CRUD ---');
  let resp = await fetch(`${base}/api/tutorials/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo: 'Tutorial Test', descripcion: 'Contenido de prueba', publicado: true })
  });
  let data = await resp.json();
  log('POST tutorial', resp.status, data);
  const id = data.id;
  resp = await fetch(`${base}/api/tutorials/`);
  data = await resp.json();
  log('GET tutorials', resp.status, Array.isArray(data) ? data.length : data);
  resp = await fetch(`${base}/api/tutorials/${id}`);
  data = await resp.json();
  log('GET tutorial by id', resp.status, data);
  resp = await fetch(`${base}/api/tutorials/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descripcion: 'Actualizado' })
  });
  data = await resp.json();
  log('PUT tutorial', resp.status, data);
  resp = await fetch(`${base}/api/tutorials/delete/${id}`, {
    method: 'DELETE'
  });
  data = await resp.json();
  log('DELETE tutorial', resp.status, data);
}
(async () => {
  try {
    await testCliente();
    await testTutorial();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
