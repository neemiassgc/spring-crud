let currentId = 0;

function loadUsers() {
	let request = new XMLHttpRequest();

	request.onreadystatechange = () => {
		if(request.readyState === 1) growProgressBar(25);
		if(request.readyState === 2) growProgressBar(25);
		if(request.readyState === 3) growProgressBar(25);

		if(request.status === 200 && request.readyState === 4) {
			let obj = JSON.parse(request.responseText);

			$("#table")[0].appendChild(getTableBody(obj));

			loadTableActions();

			showSpinner(false);
			growProgressBar(25);
		}
	}

	request.open("GET", `${URL}getUsers`, true);
	request.send();
}

function loadTableActions() {
	for(let button of $(".delete-button")) {
		button.onclick = () => {
			let id = parseInt(button.parentElement.parentElement.firstElementChild.innerHTML);

			showProgressBar(true);
			deleteUser(id);
		}
	}

	for(let button of $(".edit-modal-button")) {
		button.onclick = () => {
			$("#edit-modal").modal("show");

			let entries = $(".edit-modal-input");
			let cols = button.parentElement.parentElement.querySelectorAll("td");

			id = button.parentElement.parentElement.firstElementChild.innerHTML;

			for(let i = 0; i < entries.length; i++) {
				entries[i].value = cols[i + 1].innerHTML;
			}
		}
	}

	$("#edit-action-button")[0].onclick = () => {
		showProgressBar(true);
		let modalEntries = $(".edit-modal-input");
		let obj = {};

		if(modalEntries[0].value.length > 3) obj.name = modalEntries[0].value;
		if(modalEntries[1].value.length > 3) obj.surname = modalEntries[1].value;
		if(modalEntries[2].value.length > 3) obj.phone = modalEntries[2].value;
		if(modalEntries[3].value.length > 3) obj.country = modalEntries[3].value;
		if(modalEntries[4].value.length > 3) obj.email = modalEntries[4].value;

		obj.id = parseInt(id);

		editUser(obj);
		$("#edit-modal").modal("hide");
	};
}

function updateLastChange() {
	let len = $("#table")[0].rows.length;
	let lastDelButton = $(".delete-button")[len - 2];
	let lastEditButton = $(".edit-modal-button")[len - 2];

	lastDelButton.onclick = () => {
		let id = parseInt(lastDelButton.parentElement.parentElement.firstElementChild.innerHTML);

		showProgressBar(true);
		deleteUser(id);
	}

	lastEditButton.onclick = () => {
		$("#edit-modal").modal("show");

		let entries = $(".edit-modal-input");
		let cols = lastEditButton.parentElement.parentElement.querySelectorAll("td");

		for(let i = 0; i < entries.length; i++) {
			entries[i].value = cols[i + 1].innerHTML;
		}
	}
}

function clearAllInput() {
	for(let e of $("input")) e.value = "";
}

$("#edit-modal").on("hidden.bs.modal", () => clearAllInput());

function deleteUser(id) {
	let request = new XMLHttpRequest();

	request.onreadystatechange = () => {
		if(request.readyState === 1) growProgressBar(25);
		if(request.readyState === 2) growProgressBar(25);
		if(request.readyState === 3) growProgressBar(25);

		if(request.status === 200 && request.readyState === 4) {
			let response = JSON.parse(request.responseText);

			if(response.success) {
				getRowById(id).remove();
				growProgressBar(25);
			}
			else alert(response.message);
		}
	}

	request.open("DELETE", `${URL}deleteUser?id=${id}`, true);
	request.send();
}

function editUser(data) {
	let request = new XMLHttpRequest();

	request.onreadystatechange = () => {
		if(request.readyState === 1) growProgressBar(25);
		if(request.readyState === 2) growProgressBar(25);
		if(request.readyState === 3) growProgressBar(25);

		if(request.status === 200 && request.readyState === 4) {
			let response = JSON.parse(request.responseText);

			if(response.success) {
				let cols = getRowById(id).querySelectorAll("td");

				if(data.name != undefined) cols[1].innerHTML = data.name;
				if(data.surname != undefined) cols[2].innerHTML = data.surname;
				if(data.phone != undefined) cols[3].innerHTML = data.phone;
				if(data.country != undefined) cols[4].innerHTML = data.country;
				if(data.email != undefined) cols[5].innerHTML = data.email;
			}
			else alert(response.message);
			
			growProgressBar(25);
		}
	}

	request.open("PUT", `${URL}editUser`, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(data));
}