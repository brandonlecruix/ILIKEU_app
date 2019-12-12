const modal_creator = (modal_data) => {
/*	const modal = {
		size: 
			{
				width: 260,
				height: 160
			},
		type: "action",
		title: "ALL DONE!",
		message: "You liked # posts",
		buttons: ["Autolike more images", "Download posts"]
	}
*/	const modal = modal_data;
	const body = document.getElementsByTagName("body")[0];
	const html_adjacent = `
<div class="background_dark"></div>
<div class="app_wrapper">
	<div class="app_modal">
		<div class="modal_header">
			<div class="quitar_modal_wrapper" onclick="(function() { document.getElementsByClassName('background_dark')[0].remove(); document.getElementsByClassName('container')[0].remove(); })()">
				<div class="quitar_modal">X</div>
			</div>
			<div class="modal_header_elements_wrapper">
				<p class="title">LISTO</p>
				<p class="message">Imagenes likeadas</p>
			</div>
		</div>
		<div class="modal_content">
			<div class="buttons_wrapper">
			</div>
		</div>
	</div>
</div>
	`;
	const modal_script = document.createElement("script");
	modal_script.type = "text/javascript";
	modal_script.innerHTML = `
	const animate_background = () => {
		let count = 0; 
		const animate_background = setInterval(() => {
			count += 1; 
			const background_gradient = document.getElementsByClassName("modal_header")[0];
			background_gradient.style.background = \`linear-gradient(\${count}deg, #ed1e79 5%, rgba(102,45,140,1) 95%)\`;}, 38);	
	}
	animate_background();
	`;
	const styles = document.createElement("style");
	styles.type = "text/css";
	styles.innerHTML = `
    .app_modal {
        display: flex;
        position: fixed;
        width: ${modal.size.width}px;
        height: ${modal.size.height}px;
        z-index: 999;
        align-items: center;
        overflow: visible;
    }
	.background_dark {
        background-color: #212121;
        opacity: 0.6;
        position: fixed;
        width: 100%;
        height: 130%;
        z-index: 9;
        overflow: visible;
        margin: -86px 0px 0px 0px;
	}
	.app_wrapper {
		box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.30);
		width: 100%;
		height: 100%;
		background-color: blue;
		border-radius: 20px;
		z-index: 10;
		top 25%;
	}
	.modal_header {
		background: #ed1e79;
		background: linear-gradient(45deg, #ed1e79 5%, rgba(102,45,140,1) 95%);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 50%;
		flex-wrap: wrap;
	}
	.modal_content {
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: black;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		height: 50%;
		box-shadow: -2px 5px 20px 13px rgb(0, 0, 0)
	}
	.buttons_wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		/* background-color: purple; */
	}
	.buttons {
		font-family: arial black;
		color: white;
		border-style: none;
		background: rgb(237,30,121);
		background: linear-gradient(45deg, rgba(237,30,121,1) 27%, rgba(102,45,140,1) 88%);
		border-radius: 20px;
		padding: 11.5px;
		width: 114.55px;
	}
	.buttons:hover {
		opacity: 0.8;
	}
	.quitar_modal_wrapper {
	    margin: 0px 0px 0% 0px;
	    display: flex;
	    /* background-color: #e4ff00; */
	    height: 0%;
	    justify-content: flex-end;
	    align-items: flex-start;
	    width: 100%;
	    z-index: 9999;
	}
	.quitar_modal {
		font-weight: lighter;
		font-family: cursive;
		color: purple;
		line-height: 0px;
		background-color: white;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		margin: 5px 4px 0px 0px;
		user-select: none;
	}
	.modal_header_elements_wrapper {
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    width: 100%;
	    height: 100%;
	}
	.title {
		margin: 0% 0px 9px 0px;

	    font-family: arial black;
	    font-size: 20px;
	    color: #ffb74d;

	    user-select: none;
	}
	.message {
		margin: 0px 0px 0% 0px;

	    color: #fffffff2;
	    font-family: arial;
	    font-weight: bold;
	    font-size: 17px;

	    user-select: none;
	}
	`;
	body.insertAdjacentHTML("afterbegin", html_adjacent);
	for (let i=0; i<modal.buttons.length; i++ ) {
		let button = document.createElement("button");
		
		button.className = "buttons";
		button.innerHTML = modal.buttons[i];
		document.getElementsByClassName("buttons_wrapper")[0].append(button);
	}
	body.append(styles);
	body.append(modal_script);
};

const modal = {
		size: 
			{
				width: 260,
				height: 160
			},
		type: "action",
		title: "ALL DONE!",
		message: "You liked # posts",
		buttons: ["Autolike more images", "Download posts"]
}
modal_creator(modal);