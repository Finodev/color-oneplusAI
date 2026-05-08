// Инициализация SVG иконок Lucide
lucide.createIcons();

// --- СИСТЕМНОЕ ВРЕМЯ ---
function updateTime() {
  const now = new Date();
  const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                  now.getMinutes().toString().padStart(2, '0');
  document.getElementById('lock-time').innerText = timeStr;
  document.getElementById('status-time').innerText = timeStr;
}
setInterval(updateTime, 1000);
updateTime();

// --- РАЗБЛОКИРОВКА ---
function unlock() {
  const fp = document.querySelector('.fingerprint');
  fp.classList.add('scanning');
  
  // Легкая вибрация, если поддерживается браузером/телефоном
  if (navigator.vibrate) navigator.vibrate(50);

  setTimeout(() => {
    document.getElementById('lockscreen').classList.remove('active');
    document.getElementById('homescreen').classList.add('active');
    fp.classList.remove('scanning');
  }, 500); // Имитация сканирования
}

// --- УПРАВЛЕНИЕ ОКНАМИ ---
function openApp(id) {
  document.getElementById('app-' + id).classList.add('open');
}

function goHome() {
  const apps = document.querySelectorAll('.app-window');
  apps.forEach(app => app.classList.remove('open'));
}

// --- НАСТРОЙКИ (Скорость анимации) ---
function changeSpeed() {
  const speed = document.getElementById('anim-speed').value;
  // Меняем CSS переменную глобально
  document.documentElement.style.setProperty('--speed', speed);
}

// --- КАЛЬКУЛЯТОР (Пасхалка) ---
let calcInput = "";
const display = document.getElementById('calc-display');

function calcPress(val) {
  if (val === '=') {
    if (calcInput === "1+1") {
      display.classList.add('never-settle');
      display.innerText = "NEVER SETTLE";
      calcInput = "";
    } else {
      try {
        display.innerText = eval(calcInput);
        calcInput = display.innerText;
      } catch {
        display.innerText = "Error";
        calcInput = "";
      }
    }
  } else {
    display.classList.remove('never-settle');
    calcInput += val;
    display.innerText = calcInput;
  }
}

function calcClear() {
  calcInput = "";
  display.innerText = "0";
  display.classList.remove('never-settle');
}

// --- DYNAMIC ISLAND (Островок) ---
function triggerIsland() {
  const island = document.getElementById('dynamic-island');
  island.classList.add('active');
  if (navigator.vibrate) navigator.vibrate(20);
  
  // Автоматически сворачиваем через 3 секунды
  setTimeout(() => {
    island.classList.remove('active');
  }, 3000);
}
