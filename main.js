const generateBtn = document.getElementById('generate-btn');
const numbersWrapper = document.getElementById('lotto-numbers');
const historyList = document.getElementById('history-list');
const btnIcon = generateBtn.querySelector('i');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

let isGenerating = false;

// Theme Logic
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
}

// Lotto Logic
generateBtn.addEventListener('click', async () => {
  if (isGenerating) return;
  
  isGenerating = true;
  btnIcon.classList.add('spinning');
  generateBtn.disabled = true;

  const lottoNumbers = generateLottoNumbers();
  
  numbersWrapper.innerHTML = '';
  
  for (let i = 0; i < lottoNumbers.length; i++) {
    const ball = createBall(lottoNumbers[i]);
    numbersWrapper.appendChild(ball);
    await new Promise(resolve => setTimeout(resolve, 150));
    ball.classList.add('show');
  }

  addHistory(lottoNumbers);
  
  isGenerating = false;
  btnIcon.classList.remove('spinning');
  generateBtn.disabled = false;
});

function generateLottoNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers.sort((a, b) => a - b);
}

function createBall(num) {
  const ball = document.createElement('div');
  ball.classList.add('ball');
  ball.textContent = num;

  if (num <= 10) ball.classList.add('ball-1');
  else if (num <= 20) ball.classList.add('ball-2');
  else if (num <= 30) ball.classList.add('ball-3');
  else if (num <= 40) ball.classList.add('ball-4');
  else ball.classList.add('ball-5');

  return ball;
}

function addHistory(numbers) {
  const emptyMsg = historyList.querySelector('.empty-msg');
  if (emptyMsg) emptyMsg.remove();

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  const li = document.createElement('li');
  li.classList.add('history-item');
  li.innerHTML = `
    <span class="history-nums">${numbers.join(', ')}</span>
    <span class="history-time">${timeStr}</span>
  `;

  historyList.insertBefore(li, historyList.firstChild);

  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}
