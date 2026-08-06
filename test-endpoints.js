const base = 'http://localhost:8081';
const tests = async () => {
  try {
    const clienteCreate = await fetch(`${base}/api/customer/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: 'Test', apellido: 'Cliente', direccion: 'Local', correo: 'test@mail.com', telefono: '12345678' })
    });
    console.log('POST cliente status', clienteCreate.status);
    console.log(await clienteCreate.json());
  } catch (e) {
    console.error('cliente error', e.message);
  }
  try {
    const tutorialCreate = await fetch(`${base}/api/tutorials/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: 'Tutorial Prueba', descripcion: 'Descripcion', publicado: true })
    });
    console.log('POST tutorial status', tutorialCreate.status);
    const text = await tutorialCreate.text();
    console.log(text);
  } catch (e) {
    console.error('tutorial error', e.message);
  }
};
tests();
