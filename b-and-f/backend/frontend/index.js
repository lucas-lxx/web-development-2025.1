const table = document.getElementById("table");
const refresh_btn = document.getElementById("refresh-btn");
const submit_btn = document.getElementById("submit-btn");
const update_btn = document.getElementById("update-btn");
let table_data = [];

async function createElementTdWithValAndClass(val, cls) {
  const td = document.createElement("td");
  td.classList.add(cls);
  td.innerText = val;
  return td;
}

async function createBtnWithValAndClass(val, cls) {
  const td = document.createElement("td");
  const btn = document.createElement("button");
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
  for (idx in data) {
    const user = data[idx];
    let tr = document.getElementById(user.id);
    if (!tr) {
      tr = document.createElement("tr");
      tr.setAttribute("id", user.id);

      const name = await createElementTdWithValAndClass(user.name, "name");
      const course = await createElementTdWithValAndClass(
        user.course,
        "course"
      );
      const ira = await createElementTdWithValAndClass(user.ira, "ira");
      const del = await createBtnWithValAndClass("del", "del-btn");
      const edt = await createBtnWithValAndClass("edt", "edt-btn");

      table.appendChild(tr);
      tr.appendChild(name);
      tr.appendChild(course);
      tr.appendChild(ira);
      tr.appendChild(del);
      tr.appendChild(edt);

      // remove row from frontend and database
      del.addEventListener("click", async (event) => {
        axios.delete(`/user/${user.id}`);
        table.removeChild(tr);
      });

      edt.addEventListener("click", async (event) => {
        document.getElementById("myModal").style.display = "flex";
        const id = document.getElementById("update-id");
        const name = document.getElementById("update-name");
        const course = document.getElementById("update-course");
        const ira = document.getElementById("update-ira");
        id.value = user.id;
        name.value = user.name;
        course.value = user.course;
        ira.value = user.ira;
        // table.appendChild(form);
      });
    } else {
      await Promise.all([
        updateTdByClassFrom(tr, user.name, "name"),
        updateTdByClassFrom(tr, user.course, "course"),
        updateTdByClassFrom(tr, user.ira, "ira"),
      ]);
    }
  }
}

async function treatRefreshButton() {
  console.log("HIT");
  const res = await axios.get("/user");
  const data = res.data;
  table_data = data;
  updateTable(data);
}

async function createAlumni(event) {
  event.preventDefault();
  const name = document.getElementById("name");
  const course = document.getElementById("course");
  const ira = document.getElementById("ira");
  const res = await axios.post("/user", {
    name: name.value,
    course: course.value,
    ira: ira.value,
  });
  name.value = "";
  course.value = "";
  ira.value = "";
  console.log(res);
  name.focus();
  await treatRefreshButton();
}

async function updateAlumni() {
  const id = document.getElementById("update-id");
  const name = document.getElementById("update-name");
  const course = document.getElementById("update-course");
  const ira = document.getElementById("update-ira");
  const data = {};

  if (name.value !== "") data.name = name.value;
  if (course.value !== "") data.course = course.value;
  if (ira.value !== "") data.ira = ira.value;

  const res = await axios.patch(`/user/${id.value}`, data);
  id.value = "";
  name.value = "";
  course.value = "";
  ira.value = "";
  console.log(res);

  document.getElementById("myModal").style.display = "none";
  await treatRefreshButton();
}

refresh_btn.addEventListener("click", treatRefreshButton);
table.addEventListener("mouseenter", treatRefreshButton);
submit_btn.addEventListener("click", createAlumni);
update_btn.addEventListener("click", updateAlumni);

treatRefreshButton();
