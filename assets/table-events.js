function loadUsers() {
	showSpinner(true);

	$.ajax({
		method: "GET",
		url: `${URL}getUsers`,
	})
	.done( (data) => {
		buildTableBody(data);
		loadTableEvents();
		showSpinner(false);
	});
}

function loadTableEvents() {
	for(let button of $(".delete-button")) {
		button.onclick = () => {
			let id = parseInt(button.parentElement.parentElement.firstElementChild.innerHTML);

			deleteUser(id);
		}
	}

	for(let button of $(".edit-modal-button")) {
		button.onclick = () => {
			$("#edit-modal").modal("show");

			let entries = $(".edit-modal-input");
			let cols = button.parentElement.parentElement.querySelectorAll("td");

			id = button.parentElement.parentElement.firstElementChild.innerHTML;

			for(let i = 0; i < entries.length; i++)
				entries[i].value = cols[i + 1].innerHTML;
		}
	}

	$("#edit-action-button")[0].onclick = () => {
		let modalEntries = $(".edit-modal-input");

		editUser({
			id: parseInt(id),
			name: modalEntries[0].value,
			surname: modalEntries[1].value,
			phone: modalEntries[2].value,
			country: modalEntries[3].value,
			email: modalEntries[4].value
		});
	};

	$("#edit-modal").on("hidden.bs.modal", () => clearAllInput());
}

function updateLastChange() {
	let len = $("#table")[0].rows.length;
	let lastDelButton = $(".delete-button")[len - 2];
	let lastEditButton = $(".edit-modal-button")[len - 2];

	lastDelButton.onclick = () => {
		let id = parseInt(lastDelButton.parentElement.parentElement.firstElementChild.innerHTML);

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

function deleteUser(id) {
	showSpinner(true);
	$.ajax({
		method: "DELETE",
		url: `${URL}deleteUser?id=${id}`,
		data: id
	})
	.done( (response) => {
		getRowById(id).remove();
		showSpinner(false);
	});
}

function editUser(user) {
	$.ajax({
		method: "PUT",
		url: `${URL}editUser`,
		data: JSON.stringify(user),
		dataType: "json",
		processData: false,
		contentType: "application/json"
	})
	.done( (response) => {
		if(response.success) {
			let cols = getRowById(id).querySelectorAll("td");

			if(user.name != undefined) cols[1].innerHTML = user.name;
			if(user.surname != undefined) cols[2].innerHTML = user.surname;
			if(user.phone != undefined) cols[3].innerHTML = user.phone;
			if(user.country != undefined) cols[4].innerHTML = user.country;
			if(user.email != undefined) cols[5].innerHTML = user.email;

			$("#edit-modal").modal("hide");
			
		}
		else displayWarning(response.message);
	});
}