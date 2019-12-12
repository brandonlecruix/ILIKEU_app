const inject_floating_menu = () => {
	const body = document.getElementsByTagName("body")[0];
	const floating_menu_el = document.getElementsByClassName("floating_menu_container")[0];
	const floating_menu = 
	`
	<div class="floating_menu_container">
			<div class="menu_wrapper"
			onmouseleave="(()=>{
				document.getElementsByClassName('menu_download_posts')[0].style.visibility = 'hidden';
				document.getElementsByClassName('menu_autolike_posts')[0].style.visibility = 'hidden';
				document.getElementsByClassName('menu_unfollowers')[0].style.visibility = 'hidden';
			})()">
				<div class="menu_panel_background"></div>
				<div class="menu_header">
						<img src="${chrome_extension_uri+'assets/rounded_logo_ilikeu.png'}" class="logo" width="53px">
				</div>
				<div class="menu_options">
					<div class="icon_menu_wrapper menu_option1" 
					onmouseover="(()=>{
						document.getElementsByClassName('menu_download_posts')[0].style.visibility = 'visible';
						document.getElementsByClassName('menu_autolike_posts')[0].style.visibility = 'hidden';
						document.getElementsByClassName('menu_unfollowers')[0].style.visibility = 'hidden';
					})()">
						<img src="${chrome_extension_uri+'assets/download_posts_icon.png'}" width="38px" style="margin-top: -9px;">			
					</div>
					<div class="icon_menu_wrapper menu_download_posts">
						<button onclick="(()=>{
							play_sound('${chrome_extension_uri+"samples/buttons.m4a"}', 'button_sfx');
							document.getElementsByClassName('menu_download_posts_btn')[0].style.opacity = 0.6;
							setTimeout(()=>{document.getElementsByClassName('menu_download_posts_btn')[0].style.opacity = 1;}, 80);
							autoliker_off();
							add_download_btn();
						})()" class="menu_download_posts_btn">Download posts</button>
					</div>

					<hr width="100%" style="margin: 0px; border-width: 0.4px; border-color: #595959;">

					<div class="icon_menu_wrapper menu_option2"
					onmouseover="(()=>{
						document.getElementsByClassName('menu_autolike_posts')[0].style.visibility = 'visible';
						document.getElementsByClassName('menu_download_posts')[0].style.visibility = 'hidden';
						document.getElementsByClassName('menu_unfollowers')[0].style.visibility = 'hidden';
					})()">
						<img src="${chrome_extension_uri+'assets/like_icon.png'}" width="38px">			
					</div>
					<div class="icon_menu_wrapper menu_autolike_posts" style="top: 33.45%;">
						<button onclick="(()=>{
							play_sound('${chrome_extension_uri+"samples/buttons.m4a"}', 'button_sfx');
							autoliker_off();

							document.getElementsByClassName('menu_autolike_posts_btn')[0].style.opacity = 0.6;
							setTimeout(()=>{document.getElementsByClassName('menu_autolike_posts_btn')[0].style.opacity = 1;}, 80);
							inject_autoliker_modal(true);
							download_posts_off();
							sound_button_transition();
						})()" class="menu_autolike_posts_btn">Autolike posts</button>
					</div>

					<hr width="100%" style="margin: 0px; border-width: 0.4px; border-color: #595959;">

					<div class="icon_menu_wrapper menu_option3"
					onmouseover="(()=>{
						document.getElementsByClassName('menu_autolike_posts')[0].style.visibility = 'hidden';
						document.getElementsByClassName('menu_download_posts')[0].style.visibility = 'hidden';
						document.getElementsByClassName('menu_unfollowers')[0].style.visibility = 'visible';
					})()">
						<img src="${chrome_extension_uri+'assets/unfollowers.png'}" width="38px">			
					</div>
					<div class="icon_menu_wrapper menu_unfollowers" style="top: 66.9%;">
						<button onclick="(()=>{
							play_sound('${chrome_extension_uri+"samples/buttons.m4a"}', 'button_sfx');
							document.getElementsByClassName('unfollowers_btn')[0].style.opacity = 0.6;
							setTimeout(()=>{document.getElementsByClassName('unfollowers_btn')[0].style.opacity = 1;}, 80);
							autoliker_off();
							download_posts_off();
							get_user_info('following', 1);
	                        inject_unfollowers_context();
				            inject_unfollower_message('Getting FOLLOWING USERS...');
						})()" class="unfollowers_btn">Unfollowers</button>
					</div>
				</div>
			</div>
	</div>

	<style type="text/css">
		@font-face {
		  font-family: 'Roboto';
		  src: url('${chrome_extension_uri+'fonts/Roboto-Bold.ttf'}')  format('truetype');
		}
		.floating_menu_container {
			width: 0%;
			height: 0%;
			display: flex;
			position: fixed;
			top: 0%;
			padding: 2%;
		}
		.menu_wrapper {
			display: flex;
			flex-direction: column;
			position: absolute;
			box-shadow: 1px 15px 18px -0.2px rgba(87, 87, 124, 0.41);

		    animation: floating_menu 0.35s ease-in-out 1s 1 backwards;
		}
		.menu_header {
			width: 65px;
			height: 66px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: black;
			opacity: 0.8;

		    border-bottom-width: 3px;
		    border-image-source: linear-gradient(45deg, rgba(237,30,121,1) 5%, rgba(102,45,140,1) 95%);
			border-image-slice: 1;
		    border-bottom-style: solid;

		    border-top-left-radius: 6px;
		    border-top-right-radius: 6px;
		}
		.menu_header img {
			width: 51px;
		}
		.menu_options {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			background-color: rgba(0,0,0,.5);
			opacity: 1;
			color: white;
			width: 65px;
			overflow: visible;

		    border-bottom-left-radius: 6px;
		    border-bottom-right-radius: 6px;
		}
		.icon_menu_wrapper {
			width: 100%;
			height: 61px;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 90;
		}
		.menu_option1:hover, .menu_option2:hover, .menu_option3:hover {
			background-color: black;
		}
		@keyframes floating_menu {
		    0% {
		        width: 0px;
		        height: 0px; 
		        filter: blur(20px);         
		    }
		    65% {
		        width: 70px;
		        height: 205px; 
		        filter: blur(10px);       
		    }
		    35% {
		        width: 65px;
		        height: 192px;      
		    }
		}
		.menu_autolike_posts, .menu_download_posts, .menu_unfollowers {
			display: flex;
			flex-wrap: wrap;
			position: absolute;
			width: auto;
			left: 100%;
			visibility: hidden;
		}
		.menu_autolike_posts button, .menu_download_posts button, .menu_unfollowers button  {
		    background: rgb(237,30,121);
		    background: linear-gradient(45deg, rgba(237,30,121,1) 5%, rgba(102,45,140,1) 95%);
		    font-family: arial black;
		    color: white;
		    border-style: none;
		    
		    font-size: 13px;
		    border-color: #bdbdbd;
		    border-width: 1px;
		    padding: 6.5px;
		    width: 139px;
		    height: 100%;

		    margin: 0px 0px 0px 0px;
		}
	</style>
	`;
	const script = document.createElement("script");

	script.innerHTML = 
	`
		// Make the DIV element draggable:
		dragElement(document.getElementsByClassName("menu_wrapper")[0]);

		function dragElement(elmnt) {
		  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		  if (document.getElementsByClassName("menu_header")[0]) {
		    // if present, the menu_header is where you move the DIV from:
		    document.getElementsByClassName("menu_header")[0].onmousedown = dragMouseDown;
		  } else {
		    // otherwise, move the DIV from anywhere inside the DIV:
		    elmnt.onmousedown = dragMouseDown;
		  }

		  function dragMouseDown(e) {
		    e = e || window.event;
		    e.preventDefault();
		    // get the mouse cursor position at startup:
		    pos3 = e.clientX;
		    pos4 = e.clientY;
		    document.onmouseup = closeDragElement;
		    // call a function whenever the cursor moves:
		    document.onmousemove = elementDrag;
		  }

		  function elementDrag(e) {
		    e = e || window.event;
		    e.preventDefault();
		    // calculate the new cursor position:
		    pos1 = pos3 - e.clientX;
		    pos2 = pos4 - e.clientY;
		    pos3 = e.clientX;
		    pos4 = e.clientY;
		    // set the element's new position:
		    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		  }

		  function closeDragElement() {
		    // stop moving when mouse button is released:
		    document.onmouseup = null;
		    document.onmousemove = null;
		  }
		}
	`;
	script.type = "text/javascript";

	if ( !floating_menu_el ) {
		body.insertAdjacentHTML("beforeend", floating_menu);
		body.append(script); 		
	}
}

const remove_floating_menu = () => {
	const floating_menu = document.getElementsByClassName("floating_menu_container")[0];
	if ( floating_menu ) {
		floating_menu.remove();	
	}
}