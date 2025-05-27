const toggle_dark_mode_button = document.getElementById('toggle-dark-btn');
const dark_btn_img = document.getElementById('dark-btn-img');
const light_btn_img = document.getElementById('light-btn-img');
const burger_menu = document.getElementById('burger-menu');
const nav_ul = document.getElementById('ul');
let mode = light_btn_img;


toggle_dark_mode_button.addEventListener('click', () => {
  const theme = document.getElementById('theme');
  if (theme.getAttribute('href') === 'light.css') {
    light_btn_img.style.display = 'block';
    dark_btn_img.style.display = 'none';
    theme.setAttribute('href', 'dark.css');
    mode = dark_btn_img;
  } else {
    light_btn_img.style.display = 'none';
    dark_btn_img.style.display = 'block';
    theme.setAttribute('href', 'light.css');
    mode = light_btn_img;
  }
});


burger_menu.addEventListener('click', () => {
  console.log(nav_ul.classList.contains('no_show'));
  console.log(nav_ul.classList);
  if (nav_ul.classList.contains('no_show')) {
    nav_ul.classList.add('show');
    nav_ul.classList.remove('no_show');
  } else {
    nav_ul.classList.add('no_show');
    nav_ul.classList.remove('show');
  }
});