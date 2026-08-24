// import "./style.css";
import { initSlider } from "./components/Main/Slider.js";
import { initMagicBrush } from "./components/Effects/MagicBrush.js";
import { initContacts } from "./components/ModalBottom/QR-code.js";

document.addEventListener("DOMContentLoaded", () => {
	initSlider();
	initMagicBrush();
	initContacts();
});
