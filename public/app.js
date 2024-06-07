document.addEventListener("DOMContentLoaded", () => {
    const homePage = document.getElementById('startBtn');
    const gamePage = document.getElementById('playerName');
  
    if (homePage) {
      homePage.addEventListener('click', () => {
        const usernameInput = document.getElementById('username').value.trim();
        if (usernameInput) {
          localStorage.setItem('username', usernameInput);
          localStorage.setItem('score', 0);
          window.location.href = 'game.html';
        } else {
          alert("Please enter a valid name");
        }
      });
    }
  
    if (gamePage) {
      const username = localStorage.getItem('username');
      if (!username) {
        window.location.href = 'index.html';
        return;
      }
  
      document.getElementById('playerName').textContent = username;
      const scoreDisplay = document.getElementById('score');
      const maxScoreDisplay = document.getElementById('maxScore');
      const trafficLightImg = document.getElementById('trafficLightImg');
      const walkBtn1 = document.getElementById('walkBtn1');
      const walkBtn2 = document.getElementById('walkBtn2');
      const exitBtn = document.getElementById('exitBtn');
  
      let score = parseInt(localStorage.getItem('score'), 10);
      let maxScore = parseInt(localStorage.getItem('maxScore'), 10) || 0;
      let lastButton = '';
      let currentLight = 'red';
  
      scoreDisplay.textContent = score;
      maxScoreDisplay.textContent = maxScore;
  
      const setTrafficLight = (color) => {
        currentLight = color;
        trafficLightImg.src = color === 'red' ? 'images/red-light.png' : 'images/green-light.png';
      };
  
      const startTrafficLightCycle = () => {
        setTrafficLight('red');
        setTimeout(() => {
          setTrafficLight('green');
          let greenDuration = Math.max(10000 - score * 100, 2000) + (Math.random() * 3000 - 1500);
          setTimeout(() => startTrafficLightCycle(), greenDuration);
        }, 3000);
      };
  
      walkBtn1.addEventListener('click', () => handleWalk('walk1'));
      walkBtn2.addEventListener('click', () => handleWalk('walk2'));
  
      exitBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
  
      const handleWalk = (button) => {
        if (currentLight === 'red') {
          score = 0;
        } else {
          if (lastButton === button) {
            score = Math.max(0, score - 1);
          } else {
            score += 1;
            maxScore = Math.max(maxScore, score);
          }
          lastButton = button;
        }
  
        scoreDisplay.textContent = score;
        maxScoreDisplay.textContent = maxScore;
        localStorage.setItem('score', score);
        localStorage.setItem('maxScore', maxScore);
      };
  
      startTrafficLightCycle();
    }
  });
  