'use strict';

// Datos ficticios para mostrar el prototipo: NO son mediciones del aula.
const sampleLoads = [
  { id: 1, name: 'Luminaria LED (ejemplo)', quantity: 8, watts: 18, hours: 6 },
  { id: 2, name: 'Ventilador (ejemplo)', quantity: 2, watts: 65, hours: 5 },
  { id: 3, name: 'Proyector (ejemplo)', quantity: 1, watts: 180, hours: 3 },
  { id: 4, name: 'Computadora (ejemplo)', quantity: 1, watts: 120, hours: 5 }
];
let loads = sampleLoads.map(load => ({ ...load }));
let nextId = 5;
const $ = id => document.getElementById(id);
const number = (value, digits = 2) => Number(value).toLocaleString('es-MX', { maximumFractionDigits: digits, minimumFractionDigits: digits });

function totals() {
  const powerW = loads.reduce((sum, item) => sum + item.quantity * item.watts, 0);
  const dailyKWh = loads.reduce((sum, item) => sum + item.quantity * item.watts * item.hours / 1000, 0);
  const days = Number($('days').value);
  return { powerKW: powerW / 1000, dailyKWh, monthlyKWh: dailyKWh * (Number.isInteger(days) && days >= 1 && days <= 31 ? days : 0), count: loads.reduce((sum, item) => sum + item.quantity, 0) };
}
function render() {
  const body = $('load-table');
  body.replaceChildren();
  for (const item of loads) {
    const row = document.createElement('tr');
    for (const value of [item.name, item.quantity, number(item.watts), number(item.hours), number(item.quantity * item.watts * item.hours / 1000, 3)]) {
      const cell = document.createElement('td');
      cell.textContent = String(value);
      row.appendChild(cell);
    }
    const action = document.createElement('td');
    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.type = 'button';
    remove.textContent = 'Eliminar';
    remove.setAttribute('aria-label', `Eliminar ${item.name}`);
    remove.addEventListener('click', () => { loads = loads.filter(load => load.id !== item.id); render(); });
    action.appendChild(remove);
    row.appendChild(action);
    body.appendChild(row);
  }
  $('table-empty').hidden = loads.length !== 0;
  const t = totals();
  $('total-power').textContent = `${number(t.powerKW, 3)} kW`;
  $('total-energy').textContent = `${number(t.dailyKWh, 3)} kWh`;
  $('total-month').textContent = `${number(t.monthlyKWh, 2)} kWh`;
  $('month-caption').textContent = `${$('days').value || '0'} días de uso`;
  $('dash-power').textContent = `${number(t.powerKW, 3)} kW`;
  $('dash-energy').textContent = `${number(t.dailyKWh, 3)} kWh`;
  $('dash-items').textContent = String(t.count);
}
function navigate(name) {
  const target = document.getElementById(name) && document.getElementById(name).classList.contains('page') ? name : 'inicio';
  for (const section of document.querySelectorAll('.page')) section.classList.toggle('active', section.id === target);
  for (const link of document.querySelectorAll('.navlink')) {
    const active = link.dataset.page === target;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  }
  document.querySelector('.sidebar').classList.remove('open');
  $('toggle-menu').setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', () => navigate(decodeURIComponent(location.hash.slice(1))));
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => { location.hash = button.dataset.go; }));
$('toggle-menu').addEventListener('click', () => {
  const open = document.querySelector('.sidebar').classList.toggle('open');
  $('toggle-menu').setAttribute('aria-expanded', String(open));
});
$('days').addEventListener('input', render);
$('reset-demo').addEventListener('click', () => { loads = sampleLoads.map(load => ({ ...load })); nextId = 5; $('days').value = '22'; $('form-feedback').textContent = 'Ejemplo restaurado.'; render(); });
$('add-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = $('name').value.trim();
  const quantity = Number($('quantity').value);
  const watts = Number($('watts').value);
  const hours = Number($('hours').value);
  const days = Number($('days').value);
  if (!name || !Number.isInteger(quantity) || quantity < 1 || quantity > 10000 || !Number.isFinite(watts) || watts <= 0 || watts > 1e6 || !Number.isFinite(hours) || hours <= 0 || hours > 24 || !Number.isInteger(days) || days < 1 || days > 31) {
    $('form-feedback').textContent = 'Revisa: cantidad entera positiva, potencia mayor que cero, horas entre 0 y 24 y días entre 1 y 31.';
    return;
  }
  loads.push({ id: nextId++, name, quantity, watts, hours });
  $('add-form').reset();
  $('days').value = String(days);
  $('form-feedback').textContent = `Se agregó “${name}”.`;
  render();
});
render();
navigate(decodeURIComponent(location.hash.slice(1)));
