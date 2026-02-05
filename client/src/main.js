const display = document.getElementById('app');
const form = document.getElementById('form');
const baseURL = 'https://client-i6sr.onrender.com'
// 'http://localhost:7777'


async function fetchData() {

  const response = await fetch(`${baseURL}/ParanormalExperiences`);
  const data = await response.json();
  return data;
};


async function displayMessages() {
  display.innerHTML = "";
  const ParanormalExperiences = await fetchData();

  ParanormalExperiences.forEach((message) => {
    const row = document.createElement('div');
    row.classList.add('row');

    row.innerHTML = `
      <span>${message.name}</span>
      <span>${new Date(message.date).toLocaleDateString()}</span>
      <span>${message.event}</span>
    `;

    display.appendChild(row);
  });
}



async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const userInput = Object.fromEntries(formData.entries());

  const response = await fetch(`${baseURL}/ParanormalExperiences`, {
    headers: { "Content-Type": "application/json"},
    method:"POST",
    body: JSON.stringify(userInput),
  });

if (!response.ok) {
  const error = await response.json();
  console.error("Ghosts ate your entry:", error);
}

form.reset();
await displayMessages();
}

form.addEventListener('submit', handleSubmit);
displayMessages();
