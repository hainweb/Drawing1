//new 22


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const colorPicker = document.getElementById('color-picker');
    const sizePicker = document.getElementById('size-picker');
    const clearBtn = document.getElementById('clear-btn');
    const eraserBtn = document.getElementById('eraser-btn');
    const newRoundBtn = document.getElementById('new-round-btn');
    const promptElement = document.getElementById('prompt');
    const timerElement = document.getElementById('timer');
    const gameOverElement = document.getElementById('game-over');

    let isDrawing = false;
    let color = '#000000';
    let pencilSize = 5;
    let timeLeft = 60;
    let isGameOver = false;
    let isEraser = false;

    const prompts = ['Cat', 'House', 'Tree', 'Car', 'Sun', 'Flower', 'Fish', 'Bird','Rat','Bus','Boy','Girl'];
    const getRandomPrompt = () => prompts[Math.floor(Math.random() * prompts.length)];

    const startDrawing = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        context.beginPath();
        context.moveTo(x, y);
        isDrawing = true;
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        context.lineTo(x, y);
        context.stroke();
    };

    const stopDrawing = () => {
        isDrawing = false;
    };

    const clearCanvas = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const startNewRound = () => {
        clearCanvas();
        timeLeft = 60;
        isGameOver = false;
        gameOverElement.style.display = 'none';
        timerElement.textContent = `Time left: ${timeLeft} seconds`;
        promptElement.textContent = `Draw: ${getRandomPrompt()}`;
    };

    const updateTimer = () => {
        if (timeLeft > 0 && !isGameOver) {
            setTimeout(() => {
                timeLeft -= 1;
                timerElement.textContent = `Time left: ${timeLeft} seconds`;
                updateTimer();
            }, 1000);
        } else if (timeLeft === 0) {
            isGameOver = true;
            gameOverElement.style.display = 'block';
        }
    };

    colorPicker.addEventListener('change', (e) => {
        color = e.target.value;
        context.strokeStyle = color;
        isEraser = false;
    });

    sizePicker.addEventListener('change', (e) => {
        pencilSize = e.target.value;
        context.lineWidth = pencilSize;
    });

    clearBtn.addEventListener('click', clearCanvas);

    eraserBtn.addEventListener('click', () => {
        isEraser = !isEraser;
        context.strokeStyle = isEraser ? '#FFFFFF' : color;
    });

    newRoundBtn.addEventListener('click', startNewRound);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    context.strokeStyle = color;
    context.lineWidth = pencilSize;
    context.lineCap = 'round';

    promptElement.textContent = `Draw: ${getRandomPrompt()}`;
    updateTimer();
});
