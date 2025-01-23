const form = document.getElementById('interactive-form');
const resetButton = document.getElementById('reset-button');
const successMessage = document.getElementById('success-message');

const fields = [
  { id: 'name', errorId: 'name-error', validator: (value) => value.trim() !== '' },
  { id: 'email', errorId: 'email-error', validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
  { id: 'cpf', errorId: 'cpf-error', validator: (value) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) },
];

const cpfInput = document.getElementById('cpf');
cpfInput.addEventListener('input', () => {
  let value = cpfInput.value.replace(/\D/g, '');
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, '$1.$2');
  if (value.length > 6) value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  if (value.length > 9) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  cpfInput.value = value;
});

fields.forEach((field) => {
  const input = document.getElementById(field.id);
  input.addEventListener('input', () => {
    const errorMessage = document.getElementById(field.errorId);
    if (field.validator(input.value)) {
      errorMessage.style.display = 'none';
    } else {
      errorMessage.style.display = 'block';
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const errorMessage = document.getElementById(field.errorId);
    if (!field.validator(input.value)) {
      errorMessage.style.display = 'block';
      isValid = false;
    } else {
      errorMessage.style.display = 'none';
    }
  });

  if (isValid) {
    successMessage.style.display = 'block';
    setTimeout(() => successMessage.style.display = 'none', 3000);
    form.reset();
  }
});

resetButton.addEventListener('click', () => {
  form.reset();
  fields.forEach((field) => {
    document.getElementById(field.errorId).style.display = 'none';
  });
});
