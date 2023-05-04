const block = document.querySelectorAll('.block');
const all = document.getElementById('all');
const winnerHTML = document.querySelector('.winner')
const restartBtn = document.querySelector('.restartBtn')
const clearBtn = document.querySelector('.clearBtn')
const zerosWinsHTML = document.querySelector('.zerosWins')
const crossWinsHTML = document.querySelector('.crossWins')
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

let array = [
    '', '', '',
    '', '', '',
    '', '', '',
];

let move = 0;
let result = false;

let crossWins = 0;
let zerosWins = 0;

crossWinsHTML.innerHTML = 'Wins: ' + crossWins;
zerosWinsHTML.innerHTML = 'Wins: ' + zerosWins;

all.onclick = function(event) {
    if (event.target.className == 'block') {
        if (result == true) {
            return;
        }
        if (move % 2 == 0) {
            //кидаем в массив нолик
            array.map((item, index, array) => {
                if (event.target.id == index) {
                    array[index] = 'o';
                    checkWinner();
                }
            });
            event.target.innerHTML = 'o';
        } else if (move % 2 != 0) {
            //кидаем в массив крестик
            array.map((item, index, array) => {
                if (event.target.id == index) {
                    array[index] = 'x';
                    checkWinner();
                }
            });
            event.target.innerHTML = 'x';
        }
        move++
        console.log(move)
    }
}

function checkWinner() {
    let indexOfCross = [];
    let indexOfZero = [];
    for (let i = 0; i < array.length; i++) {
        //проверка для крестиков
        if (array[i] == 'x') {
            //пуш в массив всех i с 'x'
            indexOfCross.push(i);
            for (let j = 0; j < WINNING_COMBINATIONS.length; j++) {
                //смотрим содержит ли выигрышные комбинации indexOfCross и сохраняем в resultCross 
                let resultCross = indexOfCross.filter(x => WINNING_COMBINATIONS[j].includes(x));
                //если результат равен выигрышным комбинациям
                if (resultCross.length === WINNING_COMBINATIONS[j].length && resultCross.every((value, index) => value === WINNING_COMBINATIONS[j][index])) {
                    result = true;
                    crossWins++
                    crossWinsHTML.innerHTML = 'Wins: ' + crossWins;
                    winnerHTML.innerHTML = 'Победили крестики!';
                    winnerHTML.style.color = "rgb(26, 159, 159)";
                    return;
                }
            }
        //проверка для ноликов
        } else if (array[i] == 'o') {
            //пуш в массив всех i с 'o'
            indexOfZero.push(i);
            for (let k = 0; k < WINNING_COMBINATIONS.length; k++) {
                //смотрим содержит ли выигрышные комбинации indexOfZero и сохраняем в resultZero 
                let resultZero = indexOfZero.filter(x => WINNING_COMBINATIONS[k].includes(x));
                console.log(resultZero)
                //если результат равен выигрышным комбинациям
                if (resultZero.length === WINNING_COMBINATIONS[k].length && resultZero.every((value, index) => value === WINNING_COMBINATIONS[k][index])) {
                    result = true;
                    zerosWins++;
                    zerosWinsHTML.innerHTML = 'Wins: ' + zerosWins;
                    winnerHTML.innerHTML = 'Победили нолики!';
                    winnerHTML.style.color = "rgb(170, 39, 39)";
                    return;
                }
            }
        } 
    }
}

restartBtn.onclick = function() {
    history.go();
}

clearBtn.onclick = function(event) {
    block.forEach(element => element.innerHTML = '');
    winnerHTML.innerHTML = '';
    result = false;
    move = 0;
    array = [
        '', '', '',
        '', '', '',
        '', '', '',
    ];    
}
//добавить ничью и добавить цвет к победной комбинации


