console.log('AYYO');

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(Object.assign(document.createElement('p'), {
    textContent: 'Hello from TS~',
  }));
});
