const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const largestCountry = [
	'Russia',
	'Canada',
	'United States',
	'China',
	'Brazil',
	'Australia',
	'India',
	'Argentina',
	'Kazakhstan',
	'Algeria'
];

//Store List Items
const listItems = [];

let dragStartIndex;

createList();

//Insert list items into DOM

function createList() {
	[...largestCountry]
	.map(a => ({ value: a, sort: Math.random()}))
	.sort((a,b)=> a.sort - b.sort)
	.map(a=> a.value)
	.forEach((country, index)=> {
		console.log(country);

		const listItem= document.createElement('li');

		listItem.setAttribute('data-index', index);

		listItem.innerHTML = `   
			<span class="number">${index + 1}</span>
			<div class="draggable" draggable="true">
			<p class="country-name">${country}</p>
			<i class='fas fa-grip-lines'></i>
			</div>
		`;
		listItems.push(listItem);
		draggable_list.appendChild(listItem);
	});

	addeventListeners();
}

function dragStart(){
	dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter(){
	this.classList.add('over');
}

function dragOver(e){
	e.preventDefault();
}

function dragLeave(){
	this.classList.remove('over');
}

function dragDrop(){
	const dragEndIndex = +this.getAttribute('data-index');
	swapItems(dragStartIndex, dragEndIndex);
	this.classList.remove('over');
	console.log(dragEndIndex);
}


//Swap list items
function swapItems(fromIndex, toIndex){
	const itemOne = listItems[fromIndex].querySelector('.draggable');
	const itemTwo = listItems[toIndex].querySelector('.draggable');
	listItems[fromIndex].appendChild(itemTwo);
	listItems[toIndex].appendChild(itemOne);
}


//Check the order of the list items on button click
function checkOrder() {
	listItems.forEach((listItem,index)=> {
		const countryName = listItem.querySelector('.draggable').innerText.trim();
		if(countryName !== largestCountry[index]){
			listItem.classList.add('wrong');
		} else {
			listItem.classList.remove('wrong');
			listItem.classList.add('right');
		}
	})
}


function addeventListeners(){
	const draggables = document.querySelectorAll('.draggable');
	const dragListItems = document.querySelectorAll('.draggable-list li');

	draggables.forEach(draggable=> {
		draggable.addEventListener('dragstart', dragStart)
		});

	dragListItems.forEach(item=> {
		item.addEventListener('dragover', dragOver)
		item.addEventListener('drop', dragDrop)
		item.addEventListener('dragenter', dragEnter)
		item.addEventListener('dragleave', dragLeave);
});
}

check.addEventListener('click', checkOrder);