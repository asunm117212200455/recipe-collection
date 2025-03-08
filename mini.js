let container = document.querySelector('.container');
let mainBlock = document.querySelector('.main-block');
let generate = document.querySelector('#generate');
let start = document.querySelector('#start');
let stop = document.querySelector('#stop');
let scoreText = document.querySelector('.score>span');

let arrBlocks = []; // массив с нашими падающими блоками 
let speedBlocks = []; // массив со скоростями для падающих блоков
let points = 0; // очки (Счет:...)
let fallInterval = 0; // глобально задаем переменную для setInterval, чтобы к нему был доступ из любой функции

//!------------------------------I. КНОПКИ МЕНЮ-----------------------------
//*1. КНОПКА "Сгенерировать поле"
generate.addEventListener('click', function () {
   for (let i = 0; i < 15; i++) {
      arrBlocks.push(document.createElement('div')); // заполняем массив элементами
      arrBlocks[i].classList.add('block');
      speedBlocks.push(Math.floor(Math.random() * 15 + 5)); // заполняем массив скоростей рандомными значениями (от 5 до 20)
   }
   let leftCounter = -55;
   for (let i = 0; i < arrBlocks.length; i++) { // рандомим их местоположение и заносим их в контейнер
      leftCounter += 78;
      arrBlocks[i].style.top = Math.floor(Math.random() * 400) + 'px';
      arrBlocks[i].style.left = leftCounter + 'px';
      container.append(arrBlocks[i]); // добавляем элементы в DOM
   }
});

//*2. КНОПКА "Старт"
start.addEventListener('click', blocksFall);

//*3. КНОПКА "Стоп"
stop.addEventListener('click', function () {
   clearInterval(fallInterval);
})

//!-------II. ПАДЕНИЕ БЛОКОВ, ПОДСЧЕТ ОЧКОВ, ПРОВЕРКА СТОЛКНОВЕНИЙ----------
function blocksFall() {

   fallInterval = setInterval(falling, 20); // основной setInterval для падающих блоков
   function falling() {
      for (let i = 0; i < arrBlocks.length; i++) {
         let y = +window.getComputedStyle(arrBlocks[i]).top.slice(0, -2);
         let x = +window.getComputedStyle(arrBlocks[i]).left.slice(0, -2);
         let yMain = +window.getComputedStyle(mainBlock).top.slice(0, -2);
         let xMain = +window.getComputedStyle(mainBlock).left.slice(0, -2);
         y += speedBlocks[i];
         arrBlocks[i].style.top = y + 'px';
         if (y >= 740) {
            arrBlocks[i].remove(); // удаляем из DOM! не из массива
            arrBlocks[i].style.top = '50px';
            container.append(arrBlocks[i]);
            scoreText.innerText = `Счет: ${++points}`;
            speedBlocks[i] = Math.floor(Math.random() * 15 + 5);
         }
         else if (Math.abs(y - yMain) <= 50 && Math.abs(x - xMain) <= 50) {
            clearInterval(fallInterval);
            document.removeEventListener('keydown', blockMove);
         }
      }
   }
}

//!-----------------III. УПРАВЛЕНИЕ БЛОКОМ С КЛАВИАТУРЫ---------------------
document.addEventListener('keydown', blockMove)

function blockMove(event) {
   let n = +window.getComputedStyle(mainBlock).left.slice(0, -2);
   if (event.code == 'ArrowRight') {
      n += 50;
      mainBlock.style.left = n + 'px';
   }
   if (event.code == 'ArrowLeft') {
      n -= 50;
      mainBlock.style.left = n + 'px';
   }
}
