// Starter JavaScript
console.log('Blank website loaded');

// Background audio handling: try autoplay, fall back to a play button if blocked
(function(){
	const audio = document.getElementById('bg-audio');
	const consent = document.getElementById('music-consent');
	const playBtn = document.getElementById('music-play-btn');

	if (!audio) return;

	function onPlaySuccess() {
		if (consent) consent.style.display = 'none';
		try { localStorage.setItem('musicPlayed', 'true'); } catch(e){}
	}

	function tryPlay() {
		return audio.play().then(onPlaySuccess).catch(()=>{
			// autoplay blocked — show the consent/play UI
			if (consent) consent.style.display = 'flex';
		});
	}

	document.addEventListener('DOMContentLoaded', ()=>{
		// Attempt to play immediately (may be blocked by browser)
		tryPlay();

		if (playBtn) {
			playBtn.addEventListener('click', ()=>{
				tryPlay();
			});
		}

		// Also try to play on first user interaction (click/keydown/touch)
		function interactionOnce(){
			tryPlay();
			document.removeEventListener('click', interactionOnce);
			document.removeEventListener('keydown', interactionOnce);
			document.removeEventListener('touchstart', interactionOnce);
		}
		document.addEventListener('click', interactionOnce);
		document.addEventListener('keydown', interactionOnce);
		document.addEventListener('touchstart', interactionOnce);
	});
})();
