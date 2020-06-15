function loadHeaderEvents() {
	$("#insert-modal-button")[0].onclick = () => $("#insert-modal").modal("show");

	$("#insert-action-button")[0].onclick = () => {
		const entries = $(".insert-modal-input");

		// it needs validation
		for(let e of entries) {
			if(e.value.length < 3) return;
		}

		let obj = {
			name: entries[0].value,
			surname: entries[1].value,
			phone: entries[2].value,
			country: entries[3].value,
			email: entries[4].value
		};

		showProgressBar(true);
		insertUser(obj);
		$("#insert-modal").modal("hide");
	}

	$("#delete-all-button")[0].onclick = () => {
		showProgressBar(true);
		deleteAllUsers();
	};
}

function insertUser(data) {
	let request = new XMLHttpRequest();

	request.onreadystatechange = () => {
		if(request.readyState === 1) growProgressBar(25);
		if(request.readyState === 2) growProgressBar(25);
		if(request.readyState === 3) growProgressBar(25);

		if(request.status === 200 && request.readyState === 4) {
			let response = JSON.parse(request.responseText);

			if(response.success) {
				data.id = getNextId();
				addRow(data);

				updateLastChange();
			}
			else alert(response.message);
			
			growProgressBar(25);
		}
	}

	request.open("POST", `${URL}insertUser`, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(data));
}

$("#insert-modal").on("hidden.bs.modal", () => clearAllInput());


function deleteAllUsers() {
	let request = new XMLHttpRequest();

	request.onreadystatechange = () => {
		if(request.readyState === 1) growProgressBar(25);
		if(request.readyState === 2) growProgressBar(25);
		if(request.readyState === 3) growProgressBar(25);

		if(request.status === 200 && request.readyState === 4) {
			let response = JSON.parse(request.responseText);

			if(response.success) deleteAllRows();
			else alert(response.message);
			growProgressBar(25);
		}
	}

	request.open("DELETE", `${URL}deleteAllUsers`, true);
	request.send();
}