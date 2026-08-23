export function initMagicBrush() {
	const canvas = document.getElementById("swipe-canvas");
	if (!canvas) return;

	const ctx = canvas.getContext("2d");
	let particles = [];
	let trailPoints = [];

	function resizeCanvas() {
		const dpr = window.devicePixelRatio || 1;
		canvas.width = window.innerWidth * dpr;
		canvas.height = window.innerHeight * dpr;
		ctx.scale(dpr, dpr);
	}

	function drawFourPointStar(context, cx, cy, size) {
		context.beginPath();
		context.moveTo(cx, cy - size);
		context.quadraticCurveTo(cx, cy, cx + size, cy);
		context.quadraticCurveTo(cx, cy, cx, cy + size);
		context.quadraticCurveTo(cx, cy, cx - size, cy);
		context.quadraticCurveTo(cx, cy, cx, cy - size);
		context.closePath();
	}

	function animateEffects() {
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		// Отрисовка шлейфа
		for (let i = 1; i < trailPoints.length; i++) {
			const p1 = trailPoints[i - 1];
			const p2 = trailPoints[i];
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.strokeStyle = `rgba(36, 129, 204, ${((p1.alpha + p2.alpha) / 2) * 0.55})`;
			ctx.lineWidth = 12 * p1.alpha;
			ctx.lineCap = "round";
			ctx.stroke();
		}
		trailPoints.forEach((p) => (p.alpha -= 0.05));
		trailPoints = trailPoints.filter((p) => p.alpha > 0);

		// Частицы
		particles.forEach((p, idx) => {
			p.x += p.vx;
			p.y += p.vy;
			p.alpha -= 0.025;
			p.size *= 0.96;
			if (p.alpha <= 0 || p.size <= 0.5) {
				particles.splice(idx, 1);
				return;
			}
			ctx.save();
			ctx.globalAlpha = p.alpha;
			ctx.fillStyle = "rgba(135, 206, 250, 0.4)";
			drawFourPointStar(ctx, p.x, p.y, p.size * 1.5);
			ctx.fill();
			ctx.fillStyle = "#ffffff";
			drawFourPointStar(ctx, p.x, p.y, p.size);
			ctx.fill();
			ctx.restore();
		});
		requestAnimationFrame(animateEffects);
	}

	window.addEventListener("resize", resizeCanvas);
	window.addEventListener("pointermove", (e) => {
		trailPoints.push({ x: e.clientX, y: e.clientY, alpha: 1.0 });
		if (Math.random() < 0.4) {
			particles.push({
				x: e.clientX,
				y: e.clientY,
				vx: (Math.random() - 0.5) * 2.5,
				vy: (Math.random() - 0.5) * 2.5,
				size: Math.random() * 8 + 6,
				alpha: 1.0,
			});
		}
	});

	resizeCanvas();
	animateEffects();
}
