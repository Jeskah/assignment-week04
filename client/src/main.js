const display = document.getElementById('app');
const form = document.getElementById('form');
const baseURL = 'https://server-e0q2.onrender.com'
// 'https://client-i6sr.onrender.com/' -! LINK TO CLIENT !
// 'http://localhost:7777' -! SEREVER LOCAL PORT !-


async function fetchData() {

  const response = await fetch(`${baseURL}/ParanormalExperiences`);
  const data = await response.json();
  return data;
};


async function displayMessages() {
  display.innerHTML = "";

  let anonId = localStorage.getItem("anon_id");

if (!anonId) {
  anonId = crypto.randomUUID();
  localStorage.setItem("anon_id", anonId);

  console.log("POSTING:", userInput);

};

  const ParanormalExperiences = await fetchData();

  ParanormalExperiences.forEach((message) => {

    const row = document.createElement('div');
    row.classList.add('row');

    console.log(message);
    // console.log("row anon_id:", message.anon_id);
    console.log("local anonId:", anonId);

    row.innerHTML = `
      <div class="cell">${message.name}</div>
      <div class="cell">${new Date(message.date).toLocaleDateString()}</div>
      <div class="cell">${message.event}</div>
      <div class="cell actions"></div>
`;
      
    if (message.anon_id === anonId) {
    const actionCell = row.querySelector('.actions');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    editBtn.onclick = () => {
    console.log("Edit: message:", message.anon_id);
  };

  actionCell.appendChild(editBtn);
}

    display.appendChild(row);
  });
};

// console.log("DB anon_id:", message.anon_id);
// console.log("Local anonId:", anonId);


async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const userInput = Object.fromEntries(formData.entries());

  userInput.anon_id = anonId;

  console.log("CLIENT SENDING:", JSON.stringify(userInput));

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



