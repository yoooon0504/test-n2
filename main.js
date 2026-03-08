const generateBtn = document.getElementById('generate-btn');
const numbersWrapper = document.getElementById('lotto-numbers');
const historyList = document.getElementById('history-list');
const btnIcon = generateBtn.querySelector('i');

let isGenerating = false;

generateBtn.addEventListener('click', async () => {
  if (isGenerating) return;
  
  isGenerating = true;
  btnIcon.classList.add('spinning');
  generateBtn.disabled = true;

  const lottoNumbers = generateLottoNumbers();
  
  // Clear display
  numbersWrapper.innerHTML = '';
  
  // Display numbers one by one with animation
  for (let i = 0; i < lottoNumbers.length; i++) {
    const ball = createBall(lottoNumbers[i]);
    numbersWrapper.appendChild(ball);
    
    // Small delay for animation feel
    await new Promise(resolve => setTimeout(resolve, 200));
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
  // Remove empty message if exists
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

  // Insert at the top
  historyList.insertBefore(li, historyList.firstChild);

  // Keep only last 10
  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}
