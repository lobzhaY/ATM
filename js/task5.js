//Служебная функция рандома
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Объект купюра
function NewBill(denomination) {

    this.denomination = denomination; //Массив купюр по возрастанию уже разбитый по номиналу
    this.move = 0; //Движение купюры и её остановка
    this.rotate = 0; // Вращение купюры и её остановка

}

//Метод создания элемента
NewBill.prototype.createBill = function() {
    let el = document.createElement('div');
    el.classList.add('dollar');
    el.style.backgroundImage = `url(../img/money/${this.denomination}.png)`;
    let container = document.querySelector('.container');
    container.append(el);
    this.el = el;
}

//Метод движения купюры
NewBill.prototype.moveBill = function() {
    this.el.style.transform = `translate(0, ${this.move}px)`;
    this.move = this.move + 5;
    if (this.move > 60) {
        this.el.style.transform = `translate(0, ${this.move}px) perspective(300px) rotateX(${this.rotate}deg)`;
        this.rotate = this.rotate + 5;
    }
    if (this.move > 110) {
        clearInterval(this.timer);
    }
}

// Метод запуска движения купюры
NewBill.prototype.goBill = function() {
    this.timer = setInterval(this.moveBill.bind(this), 100);
}

//Основные функции запуска и проверки введённых данных

// Получаем кнопку и вещаем обработчик событий
let button = document.querySelector('button');
button.addEventListener('click', checkBill);

// Функция проверки и разбития на номиналы суммы
function checkBill() {
    //Получаем значение введённое пользователем
    let value = document.querySelector('input').value;
    document.querySelector('input').value = '';

    // Проверяем введённое значение на соответствие диапазону
    if (value <= 0 || value > 1000) {
        document.querySelector('input').value = 'Введена некорректная сумма!';
        return;
    }     
    let allBill = createSumArray(value);
    let allMoney = [];
    let move = 0;
    let deg = 0;
    let count = 0; 
    //Массив готовых купюр
    // Запуск работы банкомата
   
   let time = setInterval(() => {
        allMoney.push(new NewBill(allBill[count], count));
        allMoney[count].createBill();
        allMoney[count].goBill();
        changeProgressBar(count+1, allBill.length, allBill[count]);
        count++;
        if (count > allBill.length - 1) {
            clearInterval(time);
        }
    }, 2000); 
}
// Функция создания массива купюр в соответствии с рандомной выдачей
function createSumArray(num) {
    console.log(num)
    let count; 
    let arr = [];
    let x100 = 0;
    let x50 = 0;
    let x20 = 0;
    let x10 = 0;
    let x5 = 0;
    let x2 = 0;
    let x1 = 0; 
    if (num >= 100) {
        let number100 = Math.trunc(num / 100);
        x100 = randomNumber(1, number100);
        num = num - (x100 * 100);
        if (number100 <= 0) {
            x100 = 0;
            num = num - x100;
        }  
    }

    if (num >= 50) {
        let number50 = Math.trunc(num / 50);
        x50 = randomNumber(1, number50);
        num = num - (x50 * 50);

        if (number50 <= 0) {
            x50 = 0;
            num = num - x50;
        }
    }

    if (num >= 20) {
        let number20 = Math.trunc(num / 20);
        x20 = randomNumber(1, number20);
        num = num - (x20 * 20);
        if (num <= 0) {
            x20 = 0;
            num = num - x20;
        }
    }

    if (num > 10) {
        let number10 = Math.trunc(num / 10);
        x10 = randomNumber(1, number10);
        num = num - (x10 * 10);
        if (num <= 0) {
            x10 = 0;
            num = num - x10;
        }
    }

    if (num > 5) {
        let number5 = Math.trunc(num / 5);
        x5 = randomNumber(1, number5);
        num = num - (x5 * 5);
        if (num <= 0) {
            x5 = 0;
            num = num - x5;
        }
    }

    if (num > 2) {
        let number2 = Math.trunc(num / 2);
        x2 = randomNumber(1, number2);
        num = num - (x2 * 2);
        if (num <= 0) {
            x2 = 0;
            num = num - x2;
        }
    }

    if (num > 0) {       
        x1 = num; 
        if (num <= 0) {
            x1 = 0;
        }
    } 
    //Создание массива номиналов
    for (let i = 0; i < x100; i++) {
        arr.push(100);
    }
    for (let i = 0; i < x50; i++) {
        arr.push(50);
    }
    for (let i = 0; i < x20; i++) {
        arr.push(20);
    }
    for (let i = 0; i < x10; i++) {
        arr.push(10);
    }
    for (let i = 0; i < x5; i++) {
        arr.push(5);
    }
    for (let i = 0; i < x2; i++) {
        arr.push(2);
    }
    for (let i = 0; i < x1; i++) {
        arr.push(1);
    }

    console.log(arr)
    // Возвращаем массив
    return arr; 
} 
function changeProgressBar(value, max, sum) {
    let progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${(100 / max) * value}%`;
    let progressText = document.querySelector('span');
    progressText.innerHTML = parseInt(progressText.innerHTML) + sum;
}
