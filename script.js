let select;
let slidingGrid;
let moves = 0;
let size = 3;
let matrix = [];
let numbers = [];

const createMatrix = () => {
	let pointer = 0;
	for (let row = 0; row < size; row++) {
		matrix[row] = [];
		for (let column = 0; column < size; column++) {
			matrix[row][column] = numbers[pointer++];
		}
	}
};

const createGrid = () => {
	slidingGrid.innerHTML = '';
	slidingGrid.dataset.grid = size * size;

	for (let row = 0; row < size; row++) {
		for (let column = 0; column < size; column++) {
			const slidingItem = document.createElement('div');
			slidingItem.classList.add('sliding-puzzle-item');
			slidingItem.dataset.sliding = matrix[row][column];
			slidingGrid.append(slidingItem);
		}
	}
};

const updateMoves = () => {
	movesElement.textContent = moves;
};

const createNumbers = () => {
	numbers = [];
	for (let index = 0; index < size * size; index++) {
		numbers.push(index);
	}

	// shuffle numbers
	numbers.sort(() => Math.random() - 0.5);
};

const shuffle = () => {
	size = +sizeSelect.value;
	moves = 0;

	createNumbers();
	updateMoves();
	createMatrix();
	createGrid();
};

const searchNumber = (slidingItem) => {
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (slidingItem === matrix[i][j]) {
				return [i, j];
			}
		}
	}
};

const updateMatrix = (row, column) => {
	let checkRight;
	let checkLeft;
	let checkTop;
	let checkBottom;

	let currentNumber = matrix[row][column];

	if (column + 1 < size) {
		checkRight = matrix[row][column + 1] === 0;
	}

	if (column > 0) {
		checkLeft = matrix[row][column - 1] === 0;
	}

	if (row > 0) {
		checkTop = matrix[row - 1][column] === 0;
	}

	if (row + 1 < size) {
		checkBottom = matrix[row + 1][column] === 0;
	}

	if (checkRight) {
		matrix[row][column + 1] = currentNumber;
	} else if (checkLeft) {
		matrix[row][column - 1] = currentNumber;
	} else if (checkTop) {
		matrix[row - 1][column] = currentNumber;
	} else if (checkBottom) {
		matrix[row + 1][column] = currentNumber;
	}

	if (checkRight || checkLeft || checkBottom || checkTop) {
		matrix[row][column] = 0;
		moves++;
		updateMoves();
		createGrid();
	}
};

const startSliding = (slidingItem) => {
	if (slidingItem === 0) return;

	const [row, column] = searchNumber(slidingItem);
	updateMatrix(row, column);
};

document.addEventListener('DOMContentLoaded', () => {
	sizeSelect = document.querySelector('[data-select]');
	slidingGrid = document.querySelector('[data-grid]');
	resetButton = document.querySelector('[data-shuffle]');
	movesElement = document.querySelector('[data-moves]');

	shuffle();

	sizeSelect.addEventListener('change', () => {
		shuffle();
	});

	resetButton.addEventListener('click', () => {
		shuffle();
	});

	slidingGrid.addEventListener('click', (event) => {
		const slidingItem = event.target.dataset.sliding;

		if (slidingItem) {
			startSliding(+slidingItem);
		}
	});
});
