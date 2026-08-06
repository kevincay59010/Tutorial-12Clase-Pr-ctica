const base = 'http://localhost:8081';
const log = console.log;
async function run() {
  try {
    log('--- Testing cliente endpoints ---');
    let resp = await fetch(base + '/api/customer/create/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nombre: 'Test', apellido: 'Cliente', direccion: 'Local', correo: 'test@mail.com', telefono: '12345678' }) });
    let data = await resp.json(); log('POST cliente:', resp.status, data);
    const clienteId = data.id;

    resp = await fetch(base + '/api/customer/'); data = await resp.json(); log('GET clientes:', resp.status, Array.isArray(data) ? 'count=' + data.length : data);
    resp = await fetch(base + '/api/customer/' + clienteId); data = await resp.json(); log('GET cliente by id:', resp.status, data);
    resp = await fetch(base + '/api/customer/update/' + clienteId, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ direccion: 'Actualizada' }) }); data = await resp.json(); log('PUT cliente:', resp.status, data);
    resp = await fetch(base + '/api/customer/delete/' + clienteId, { method: 'DELETE' }); data = await resp.json(); log('DELETE cliente:', resp.status, data);

    log('--- Testing tutorial endpoints ---');
    resp = await fetch(base + '/api/tutorials/create/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ titulo: 'Tutorial Prueba', descripcion: 'Descripción', publicado: true }) });
    const text = await resp.text();
    log('POST tutorial raw status:', resp.status, 'body:', text);
    try { data = JSON.parse(text); } catch(e) { data = null; }
    log('POST tutorial parsed:', data);

    if (data && data.id) {
      const tutorialId = data.id;
      resp = await fetch(base + '/api/tutorials/'); data = await resp.json(); log('GET tutorials:', resp.status, Array.isArray(data) ? 'count=' + data.length : data);
      resp = await fetch(base + '/api/tutorials/' + tutorialId); data = await resp.json(); log('GET tutorial by id:', resp.status, data);
      resp = await fetch(base + '/api/tutorials/update/' + tutorialId, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ descripcion: 'Actualizado' }) }); data = await resp.json(); log('PUT tutorial:', resp.status, data);
      resp = await fetch(base + '/api/tutorials/delete/' + tutorialId, { method: 'DELETE' }); data = await resp.json(); log('DELETE tutorial:', resp.status, data);
    }

    process.exit(0);
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
}
run();
