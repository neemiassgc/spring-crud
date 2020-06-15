function getTableBody(obj) {
	let tbody = $("#table")[0].createTBody();

	for(let o of obj) {
		let row = document.createElement("tr");

		let id = document.createElement("td");
		id.innerHTML = o.id;

		let name = document.createElement("td");
		name.innerHTML = o.name;

		let surname = document.createElement("td");
		surname.innerHTML = o.surname;

		let phone = document.createElement("td");
		phone.innerHTML = o.phone;

		let country = document.createElement("td");
		country.innerHTML = o.country;

		let email = document.createElement("td");
		email.innerHTML = o.email;

		row.appendChild(id);
		row.appendChild(name);
		row.appendChild(surname);
		row.appendChild(phone);
		row.appendChild(country);
		row.appendChild(email);
		row.appendChild(getButtons());

		tbody.appendChild(row);
	}

	$(".row")[0].classList.add("overflow-auto");
	return tbody;
}

function getButtons() {
	let td = document.createElement("td");
	let editBtn = document.createElement("button");
	let deleteBtn = document.createElement("button");

	editBtn.type = deleteBtn.type = "button";

	editBtn.innerHTML = "Edit";
	deleteBtn.innerHTML = "Delete";

	editBtn.classList.add("btn", "btn-outline-warning", "mr-2", "mt-2", "edit-modal-button");
	deleteBtn.classList.add("btn", "btn-outline-danger", "mt-2", "delete-button");

	td.appendChild(editBtn);
	td.appendChild(deleteBtn);

	return td;
}

function showSpinner(show) {
	if(show) $("#spinner")[0].classList.remove("d-none");
	else $("#spinner")[0].classList.add("d-none");
}

function getRowById(id) {
	let row = $("#table")[0].rows;

	for(let e = 1; e < row.length; e++) {
		let col = row[e].firstElementChild;
		if(col.innerHTML === id+"") return row[e];
	} 

	return null;
}

function loadTable() {
	showSpinner(true);
	showProgressBar(true);

	loadUsers();
}

function addRow(obj) {
	let tbody = $("#table")[0].tBodies[0];
	let row = document.createElement("tr");
	let id = document.createElement("td");
	let name = document.createElement("td");
	let surname = document.createElement("td");
	let phone = document.createElement("td");
	let country = document.createElement("td");
	let email = document.createElement("td");

	id.innerHTML = obj.id != isNaN ? obj.id : -1;
	name.innerHTML = obj.name;
	surname.innerHTML = obj.surname;
	phone.innerHTML = obj.phone;
	country.innerHTML = obj.country;
	email.innerHTML = obj.email;

	row.appendChild(id);
	row.appendChild(name);
	row.appendChild(surname);
	row.appendChild(phone);
	row.appendChild(country);
	row.appendChild(email);
	row.appendChild(getButtons());

	tbody.appendChild(row);
}

function getNextId() {
	let rows = $("#table")[0].rows;
	let nextId = rows[rows.length - 1].firstChild.innerHTML;
	return parseInt(nextId) + 1;
}

function showProgressBar(show) {
	if(show) $("#progress-bar")[0].classList.remove("d-none");
	else $("#progress-bar")[0].classList.add("d-none");
}

function growProgressBar(amount) {
	let bar = $("#progress")[0];
    let progress = bar.style.width.substr(0,  bar.style.width.length - 1);
    bar.style.width = (parseInt(progress) + amount)+"%";

    if(bar.style.width === "100%") {
    	setTimeout( () => {
    		showProgressBar(false);
    		bar.style.width = "0%";
    	}, 500);
    }
}

function deleteAllRows() {
	$("#table")[0].tBodies[0].innerHTML = "";
}