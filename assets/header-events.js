function loadHeaderEvents() {
	$("#insert-modal-button")[0].onclick = () => $("#insert-modal").modal("show");

	$("#insert-action-button")[0].onclick = () => {
		const entries = $(".insert-modal-input");

		insertUser({
			name: entries[0].value,
			surname: entries[1].value,
			phone: entries[2].value,
			country: entries[3].value,
			email: entries[4].value
		});
	}

	$("#delete-all-button")[0].onclick = () => deleteAllUsers();

	$("#insert-modal").on("hidden.bs.modal", () => clearAllInput());
}

function insertUser(user) {
	$.ajax({
		method: "POST",
		url: `${URL}insertUser`,
		data: JSON.stringify(user),
		dataType: "json",
		processData: false,
		contentType: "application/json"
	})
	.done( (response) => {
		if(response.success) {
			user.id = getNextId();
			addRow(user);
			updateLastChange();
			$("#insert-modal").modal("hide");
		}
		else displayWarning(response.message);
	});
}

function deleteAllUsers() {
	showSpinner(true);

	$.ajax({
		method: "DELETE",
		url: `${URL}deleteAllUsers`,
	})
	.done( (response) => {
		deleteAllRows();
		showSpinner(false);
	});
}