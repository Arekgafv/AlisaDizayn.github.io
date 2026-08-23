export function initSlider() {
	const track = document.getElementById("sliderTrack");
	if (!track) return;

	const originalSlides = Array.from(track.children);
	const originalLength = originalSlides.length;
	const dots = Array.from(document.querySelectorAll(".services-slider__dot"));
	const nextBtn = document.getElementById("nextBtn");
	const prevBtn = document.getElementById("prevBtn");

	const firstClone = originalSlides[0].cloneNode(true);
	const lastClone = originalSlides[originalLength - 1].cloneNode(true);

	track.appendChild(firstClone);
	track.insertBefore(lastClone, originalSlides[0]);

	let currentIndex = 1;
	let isDragging = false;
	let isTransitioning = false;
	let startX = 0;
	let startTime = 0;

	// Начальная установка
	track.style.transition = "none";
	track.style.transform = `translateX(-100%)`;

	function updateSlider() {
		const currentTranslate = currentIndex * -100;
		track.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
		track.style.transform = `translateX(${currentTranslate}%)`;

		let activeDotIndex = currentIndex - 1;
		if (currentIndex === 0) activeDotIndex = originalLength - 1;
		else if (currentIndex === originalLength + 1) activeDotIndex = 0;

		dots.forEach((dot, idx) => {
			dot.classList.toggle("services-slider__dot--active", idx === activeDotIndex);
		});
	}

	nextBtn?.addEventListener("click", () => {
		if (isTransitioning) return;
		isTransitioning = true;
		currentIndex++;
		updateSlider();
	});

	prevBtn?.addEventListener("click", () => {
		if (isTransitioning) return;
		isTransitioning = true;
		currentIndex--;
		updateSlider();
	});

	dots.forEach((dot) => {
		dot.addEventListener("click", (e) => {
			if (isTransitioning) return;
			isTransitioning = true;
			currentIndex = parseInt(e.target.dataset.index) + 1;
			updateSlider();
		});
	});

	track.addEventListener("transitionend", (e) => {
		if (e.target !== track) return;
		isTransitioning = false;
		if (currentIndex === 0) {
			track.style.transition = "none";
			currentIndex = originalLength;
			track.style.transform = `translateX(${currentIndex * -100}%)`;
		} else if (currentIndex === originalLength + 1) {
			track.style.transition = "none";
			currentIndex = 1;
			track.style.transform = `translateX(${currentIndex * -100}%)`;
		}
	});

	// Touch события
	track.addEventListener(
		"touchstart",
		(e) => {
			if (isTransitioning) return;
			startX = e.touches[0].clientX;
			startTime = Date.now();
			isDragging = true;
			track.style.transition = "none";
		},
		{ passive: true },
	);

	track.addEventListener(
		"touchmove",
		(e) => {
			if (!isDragging) return;
			const currentX = e.touches[0].clientX;
			const diffX = currentX - startX;
			const dragPercent = (diffX / track.parentElement.offsetWidth) * 100;
			track.style.transform = `translateX(${currentIndex * -100 + dragPercent}%)`;
		},
		{ passive: true },
	);

	track.addEventListener("touchend", (e) => {
		if (!isDragging) return;
		isDragging = false;
		const movedBy =
			((e.changedTouches[0].clientX - startX) / track.parentElement.offsetWidth) *
			100;
		const elapsedTime = Date.now() - startTime;

		if ((elapsedTime < 250 && Math.abs(movedBy) > 5) || Math.abs(movedBy) > 15) {
			if (movedBy < 0) currentIndex++;
			else currentIndex--;
		}
		isTransitioning = true;
		updateSlider();
	});
}
