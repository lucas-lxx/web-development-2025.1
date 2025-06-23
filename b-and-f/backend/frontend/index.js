const table = document.getElementById("table");
const refresh_btn = document.getElementById("refresh-btn");
let table_data = [];

async function createElementTdWithValAndClass(val, cls) {
  const td = document.createElement('td');
  td.classList.add(cls);
  td.innerText = val;
  return td;
}

async function updateTdByClassFrom(from, val, cls) {
  const td = from.getElementsByClassName(cls)[0];
  td.innerText = val;
}

async function updateTable(data) {
  for(idx in data) {
    const user = data[idx];
    let tr = document.getElementById(user.id);
    if (!tr) {
      tr = document.createElement('tr');
      tr.setAttribute('id', user.id);

      const name = await createElementTdWithValAndClass(user.name, 'name');
      const course = await createElementTdWithValAndClass(user.course, 'course');
      const ira = await createElementTdWithValAndClass(user.ira, 'ira');

      table.appendChild(tr);
      tr.appendChild(name);
      tr.appendChild(course);
      tr.appendChild(ira);
    } else {
      await Promise.all([
        updateTdByClassFrom(tr, user.name, 'name'),
        updateTdByClassFrom(tr, user.course, 'course'),
        updateTdByClassFrom(tr, user.ira, 'ira')
      ]);
    }
  }
}

async function treatRefreshButton() {
  console.log('HIT');
  const res = await axios.get('/user')
  const data = res.data;
  table_data = data;
  updateTable(data);
}

treatRefreshButton();

const refresh_interval_id = setInterval(treatRefreshButton, 5000);

document.addEventListener('load', treatRefreshButton)
refresh_btn.addEventListener('click', treatRefreshButton);
table.addEventListener('mouseenter', treatRefreshButton)