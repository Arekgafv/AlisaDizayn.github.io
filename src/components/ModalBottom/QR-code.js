// const VCARD_DATA = [
// 	"BEGIN:VCARD",
// 	"VERSION:3.0",
// 	"FN:AlisaDizayn",
// 	"TEL:+998910016213",
// 	"URL:https://t.me/AlisaDizayn",
// 	"END:VCARD",
// ].join("\r\n");

// export function initContacts() {
// 	const saveContactBtn = document.getElementById("saveContactBtn");
// 	const qrModal = document.getElementById("qrModal");
// 	const closeModalBtn = document.getElementById("closeModalBtn");

// 	if (!saveContactBtn) return;

// 	saveContactBtn.addEventListener("click", () => {
// 		saveContactBtn.classList.add("save-contact-btn--clicked");
// 		const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// 		if (isMobile) {
// 			const blob = new Blob([VCARD_DATA], { type: "text/vcard;charset=utf-8;" });
// 			const url = URL.createObjectURL(blob);
// 			const a = document.createElement("a");
// 			a.href = url;
// 			a.download = "AlisaDizayn.vcf";
// 			document.body.appendChild(a);
// 			a.click();
// 			document.body.removeChild(a);
// 			URL.revokeObjectURL(url);
// 		} else {
// 			qrModal?.classList.add("info-modal--active");
// 		}
// 	});

// 	closeModalBtn?.addEventListener("click", () =>
// 		qrModal.classList.remove("info-modal--active"),
// 	);

// 	window.addEventListener("click", (e) => {
// 		if (e.target === qrModal) qrModal.classList.remove("info-modal--active");
// 	});
// }

import { ICON_SAVE, ICON_ADDED } from "../../assets/icons.js";

const VCARD_DATA = [
	"BEGIN:VCARD",
	"VERSION:3.0",
	"FN:AlisaDizayn",
	"TEL:+998910016213",
	"URL:https://t.me/AlisaDizayn",
	"END:VCARD",
].join("\r\n");

export function initContacts() {
	const saveContactBtn = document.getElementById("saveContactBtn");
	const qrModal = document.getElementById("qrModal");
	const closeModalBtn = document.getElementById("closeModalBtn");

	if (!saveContactBtn) return;

	saveContactBtn.addEventListener("click", () => {
		// 1. Добавляем класс стиля (серая кнопка)
		saveContactBtn.classList.add("save-contact-btn--added");

		// 2. Меняем иконку внутри на "Добавлен"
		saveContactBtn.innerHTML = ICON_ADDED;

		const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

		if (isMobile) {
			const blob = new Blob([VCARD_DATA], { type: "text/vcard;charset=utf-8;" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "AlisaDizayn.vcf";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} else {
			qrModal?.classList.add("info-modal--active");
		}
	});

	closeModalBtn?.addEventListener("click", () =>
		qrModal.classList.remove("info-modal--active"),
	);

	window.addEventListener("click", (e) => {
		if (e.target === qrModal) qrModal.classList.remove("info-modal--active");
	});
}
