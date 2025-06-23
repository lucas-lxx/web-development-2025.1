const table = document.getElementById("table");
const refresh_btn = document.getElementById("refresh-btn");
const submit_btn = document.getElementById("submit-btn");
let table_data = [];

async function createElementTdWithValAndClass(val, cls) {
  const td = document.createElement('td');
  td.classList.add(cls);
  td.innerText = val;
  return td;
}

async function createBtnWithValAndClass(val, cls) {
  const td = document.createElement('td');
  const btn = document.createElement('button');
  td.classList.add(cls);
  btn.innerText = val;
  td.appendChild(btn);
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
      const del = await createBtnWithValAndClass('del', 'del-btn')

      table.appendChild(tr);
      tr.appendChild(name);
      tr.appendChild(course);
      tr.appendChild(ira);
      tr.appendChild(del);

      del.addEventListener('click', async (event) => {
        axios.delete(`/user/${user.id}`);
        table.removeChild(tr);
      })
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

async function createAlumni(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const course = document.getElementById('course').value;
  const ira = document.getElementById('ira').value;
  const res = await axios.post('/user', {
    name,
    course,
    ira
  });

  console.log(res);
}

const refresh_interval_id = setInterval(treatRefreshButton, 5000);

document.addEventListener('load', treatRefreshButton)
refresh_btn.addEventListener('click', treatRefreshButton);
table.addEventListener('mouseenter', treatRefreshButton)

document.addEventListener('submit', createAlumni);