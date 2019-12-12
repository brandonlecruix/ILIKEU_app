let active_sounds = true;

let play_sound = (url, selector_class) => {
	if ( active_sounds === true ) {
		let audio = document.getElementsByClassName(selector_class)[0];

		if (!audio) {
			let html = `<audio class="${selector_class}" src="${url}"></audio>`;
			let body = document.getElementsByTagName("body")[0];
			body.insertAdjacentHTML("afterbegin", html);
			let audio = document.getElementsByClassName(selector_class)[0];
			let playPromise = audio.play();

			if ( playPromise !== undefined ) {
				playPromise.then(_ => {
				  // Automatic playback started!
				  // Show playing UI.
				})
				.catch(error => {
				  // Auto-play was prevented
				  // Show paused UI.
				});
			}
		} else {
			let audio = document.getElementsByClassName(selector_class)[0];
			audio.play();
		}
	}
}