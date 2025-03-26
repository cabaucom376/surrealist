import glowUrl from "~/assets/images/gradient-glow.webp";

function preloadImage(url: string) {
	const img = new Image();
	img.src = url;
}

export function preloadImages() {
	preloadImage(glowUrl);
}
