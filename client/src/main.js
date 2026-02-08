const display = document.getElementById('app');
const form = document.getElementById('form');
const baseURL = 'https://server-e0q2.onrender.com'
// 'http://localhost:7777'

let anonId = localStorage.getItem("anon-id");

if (!anonId) {
  anonId = crypto.randomUUID();
  localStorage.setItem("anon-id", anonId);
};

async function fetchData() {

  const response = await fetch(`${baseURL}/ParanormalExperiences`);
  const data = await response.json();
  return data;
};


async function displayMessages() {
  display.innerHTML = "";
  const ParanormalExperiences = await fetchData();

  ParanormalExperiences.forEach((message) => {
    console.log(message);
    console.log("row anon_id:", message.anon_id);
console.log("local anonId:", anonId);


    const row = document.createElement('div');
    row.classList.add('row');

    row.innerHTML = `
      <span>${message.name}</span>
      <span>${new Date(message.date).toLocaleDateString()}</span>
      <span>${message.event}</span>
    `;


// console.log("DB anon_id:", message.anon_id);
// console.log("Local anonId:", anonId);



  if (message.anon_id === anonId) {
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    editBtn.onclick = () => {
    console.log("Edit: message:", message.id);
  };

  row.appendChild(editBtn);
}

    display.appendChild(row);
  });
}


async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const userInput = Object.fromEntries(formData.entries());

  userInput.anon_id = anonId;

  const response = await fetch(`${baseURL}/ParanormalExperiences`, {
    headers: { "Content-Type": "application/json"},
    method:"POST",
    body: JSON.stringify(userInput),
  });

if (!response.ok) {
  const error = await response.json();
  console.error("Ghosts stole your entry:", error);
}

form.reset();
await displayMessages();
}

form.addEventListener('submit', handleSubmit);


displayMessages();

