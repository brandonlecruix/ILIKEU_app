let chrome_extension_uri = document.getElementsByClassName("chrome_extension_uri")[0].innerHTML;
	chrome_extension_uri = (chrome_extension_uri.split("").splice(0, chrome_extension_uri.split("").length-2)).join("");
const chrome_extension_id = document.getElementsByClassName("chrome_extension_id")[0].innerHTML;
let n_of_posts;
let liking_speed;

const unlock_speed_btns = () => {
	let input = document.getElementsByClassName("Nº_posts_input")[0];
	let speed_button = document.getElementsByClassName("speed_button");
	const speed_btns = document.getElementsByClassName("speed")[0];
	input = input.value.toString();
	input = input.split("");
	speed_btns.style.opacity = '0.5';
	let input_has_whitespace;
	lock_start_btn(true);
	for (let j = 0; j < speed_button.length; j++) {
		speed_button[j].style.boxShadow = "";
		speed_button[j].style.filter = "";
		speed_button[j].disabled = true;
	}
	for(let i = 0; i < input.length; i++) {
		if((input.join("") <= 0) || (input.length > 3)   ||   (input.join("") * 0 !== 0)   ||   (input[i] === " ")) {
			input_has_whitespace = true;
			speed_btns.style.opacity = '0.5';
			for (let j = 0; j < speed_button.length; j++) {
				speed_button[j].style.boxShadow = "";
				speed_button[j].style.filter = "";
				speed_button[j].disabled = true;
			}
		} else {
			speed_btns.style.opacity = '1';
			speed_btns.disabled = false;
			for (let j = 0; j < speed_button.length; j++) {
				speed_button[j].style.boxShadow = "";
				speed_button[j].style.filter = "";
				speed_button[j].disabled = false;
			}
		}
	}
}	

const select_speed_button = (button_index) => {
	const speed_btns = document.getElementsByClassName("speed_button");
	lock_start_btn(false);
	for (let i = 0; i < speed_btns.length; i++) {
		if(i === button_index) {
			speed_btns[i].style.boxShadow = "";
			speed_btns[i].style.filter = "";
			n_of_posts = eval(document.getElementsByClassName("Nº_posts_input")[0].value);
			switch (button_index) {
				case 0:
					play_sound(chrome_extension_uri+"samples/buttons.m4a", "button_sfx");
					liking_speed = "fast";
					break;
				case 1:
					play_sound(chrome_extension_uri+"samples/buttons.m4a", "button_sfx");
					liking_speed = "mid";
					break;
				case 2:
					play_sound(chrome_extension_uri+"samples/buttons.m4a", "button_sfx");
					liking_speed = "slow";
					break;
			}
			continue;
		} else {
			speed_btns[i].style.boxShadow = "rgb(0, 0, 0) 0px 0px 30px 0px inset";
			speed_btns[i].style.filter = "blur(0.8px)";
		}
	}
}

const change_start_btn_backgr = () => {
	play_sound(chrome_extension_uri+"samples/buttons.m4a", "button_sfx");
	document.getElementsByClassName("start_btn")[0].style.backgroundColor = "#6d2c8b";
	remove_app_modal();
	click_thumbnail(1);
	main(liking_speed, n_of_posts);
}

const lock_start_btn = (boolean) => {
	let start_btn = document.getElementsByClassName("start_btn")[0];
	if (boolean === true) {
		start_btn.disabled = true;
		start_btn.style.backgroundColor = "#333333";
	} else {
		start_btn.disabled = false;			
	}
}

const remove_app_modal = () => {
	const app_background = document.getElementsByClassName("background")[0];
	const cancel_modal_wrapper = document.getElementsByClassName("cancel_modal_wrapper")[0];
	const app_modal = document.getElementsByClassName("app_wrapper")[0];
	const app_styles = document.getElementsByClassName("app_styles")[0];
	const app_js = document.getElementsByClassName("app_js")[0];

	if ( app_background && app_modal ) {
		app_background.remove();
		app_modal.remove();		
	}
}

const sound_button_transition = () => {
	let sounds_button = document.getElementsByClassName("sounds")[0].getElementsByTagName("img")[0];
	if (sounds_button.src === (chrome_extension_uri+"assets/sounds_activated.svg") ) {
		sounds_button.src = chrome_extension_uri+"assets/sounds_deactivated.svg";
		active_sounds = false;
	} else {
		sounds_button.src = chrome_extension_uri+"assets/sounds_activated.svg";
		active_sounds = true;
	}
}

const change_content_section = () => {
	const content = document.getElementsByClassName("content")[0];
	const autolike_section = `
		<div class="autolike_section">
			<div class="posts_qty">
				<p style="
				    font-family: arial;
				    font-weight: bold;
				    font-size: 13px;
				    color: #ed1e79;
				    margin-top: 20px;
				    margin-bottom: 48px;
				    /* box-shadow: -1px 1px 20px 0px rgba(255, 0, 235, 0.27); */
				">
					Nº of posts
				</p>
				<input class="Nº_posts_input" type="text" oninput="unlock_speed_btns()" onkeypress="" onclick="unlock_speed_btns()" style="
				    width: 60.5px;
				    margin: -43px 0px 18px 0px;
				    border: 0;
				    border-bottom: 2px solid #ed1e79;
				    background: transparent;
				    color: White;
				    box-shadow: inset 0px 2px 12px 0px rgba(110, 0, 255, 0.57);
				    font-size: 17px;
				    height: 25px;
				    text-align: center;
				">
			</div>
			<div class="speed">
				<button class="fast speed_button" disabled onclick="select_speed_button(0)" style="
				    /*box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.30);*/
				    background: rgb(237,30,121);
				    background: linear-gradient(45deg, rgba(237,30,121,1) 5%, rgba(102,45,140,1) 95%);
				    font-family: arial black;
				    color: white;
				    border-style: none;
				    border-radius: 20px;
				    padding: 6.5px;
				    width: 66.55px;
				">
					Fast
				</button>
				<button class="mid speed_button" disabled onclick="select_speed_button(1)" style="
				    /*box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.30);*/
				    background: rgb(237,30,121);
				    background: linear-gradient(45deg, rgba(237,30,121,1) 5%, rgba(102,45,140,1) 95%);
				    font-family: arial black;
				    color: white;
				    border-style: none;
				    border-radius: 20px;
				    padding: 6.5px;
				    width: 66.55px;
				">
					Mid
				</button>
				<button class="slow speed_button" disabled onclick="select_speed_button(2)" style="
				    /* box-shadow: -1px 1px 20px 0px rgba(75, 0, 255, 0.94); */
				    /* background: rgb(237,30,121); */
				    background: linear-gradient(45deg, rgba(237,30,121,1) 5%, rgba(102,45,140,1) 95%);
				    font-family: arial black;
				    color: white;
				    border-style: none;
				    border-radius: 20px;
				    padding: 6.5px;
				    width: 66.55px;
				">
					Slow
				</button>
			</div>
		</div>
		<div class="footer">
			<button class="start_btn" disabled="true" onclick="change_start_btn_backgr(); inject_floating_menu();" style="
			    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.26);
			    background-color: #333333;
			    font-family: arial black;
			    border-top: none;
			    border-bottom-left-radius: 12px;
			    border-bottom-right-radius: 12px;
			    border-bottom: none;
			    border-color: #bdbdbd white white white;
			    border-top-width: 1px;
			    border-right-width: 0px;
			    border-left-width: 0px;
			    padding: 11px 0px 11px 0px;
			    width: 100%;
			    color: white;
			    line-height: 7px;
			">
				Start
			</button>
		</div>
	`;
	content.innerHTML = autolike_section;
}

const inject_autoliker_modal = (autolike) => {
	const HTML_CSS =
	`
	    <meta charset="utf-8">
	    <div class="background" onclick="remove_app_modal();">
	    </div>
	    <div class="app_wrapper">
	    	<img src="${chrome_extension_uri+"assets/cancel.png"}" class="cancel_modal" onclick="remove_app_modal(); inject_floating_menu();">
	        <div class="app_container">
	            <div class="modal_app" onload="(function() {console.log(1);}();">
	                <div class="header">
	                    <div class="sounds" onclick="sound_button_transition(); play_sound('${chrome_extension_uri+"samples/buttons.m4a"}', 'button_sfx');">
	                        <img width="27" src="${chrome_extension_uri+"assets/sounds_activated.svg"}" draggable="false">
	                    </div>
	                    <div class="logo">
	                        <img src="${chrome_extension_uri+"assets/logo.gif"}" draggable="false">
	                    </div>
	                    <div class="app_identity">
	                        <p class="name">I Like U</p>
	                        <p class="description">Instagram auto liker.</p>
	                    </div>
	                    <div class="author">
	                        <a href="https://instagram.com/brandonlacruz" target="_blank">by Brandon lacruz</a>
	                    </div>
	                </div>
	                <div class="header_gradient rotation"></div>
	                <div class="content">
	                
	                    <div class="selection_menu">    
	                        <button class="autolike_posts" style="
	                        " onclick="
	                        change_content_section();
	                        play_sound('${chrome_extension_uri+"samples/buttons.m4a"}', 'button_sfx');">
	                            Autolike posts
	                        </button>
	                        <button class="download_posts" style="
	                        " onclick="
	                        add_download_btn(); 
	                        remove_app_modal(); 
	                        inject_floating_menu();
	                        play_sound('${chrome_extension_uri+"samples/buttons.m4a"}', 'button_sfx');
	                        ">
	                            Download posts
	                        </button>

	                        <button class="unfollowers" style="
	                        " onclick=" 
	                        remove_app_modal(); 
	                        inject_floating_menu();
	                        play_sound('${chrome_extension_uri+"samples/buttons.m4a"}', 'button_sfx');
	                        get_user_info('following', 1);
	                        inject_unfollowers_context();
				            inject_unfollower_message('Getting FOLLOWING USERS...');
	                        ">
	                            Unfollowers
	                        </button>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>

	    <style type="text/css" class="app_styles">
	    	.header_gradient {
			    width: 100%;
			    height: 100%;
			    padding: 70%;
			    position: absolute;
			    left: -18%;
			    top: -25%;
			    z-index: 0;
			    background-image: linear-gradient(0deg, #ed1e79 5%, rgba(102,45,140,1) 95%);	            
	    	}
			.rotation {
				animation-name: rotate_gradient;
				animation-iteration-count:infinite;
				animation-duration: 10s;
			}
			@keyframes rotate_gradient {
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(360deg);  
				}
			}
	    	.cancel_modal {
			    position: absolute;
			    right: 0%;
			    top: 0%;
			    z-index: 12;
			    margin: 1% 1% 0% 0%;
	    	}
	    	.cancel_modal:hover {
	    		opacity: 0.55;
	    	}
	    	.cancel_modal:active {
	    		opacity: 1;
	    	}
	        .app_wrapper {
	            display: flex;
	            position: fixed;
	            width: 100%;
	            height: 100%;
	            align-items: center;
	            z-index: 11;
	        }
	        .background {
	            background-color: #212121;
	            opacity: 0.6;
	            position: fixed;
	            width: 100%;
	            height: 130%;
	            z-index: 10;
	            overflow: visible;
	            margin: -86px 0px 0px 0px;
	        }
	        .app_container {
	            width: 248px;
	            /*height: 376px;*/
	            display: flex;
	            justify-content: center;
	            align-items: center;
	            top: 25%;
	            z-index: 11;
	        }
	        .modal_app {
	            display: flex;
	            flex-direction: column;
	            flex-wrap: wrap;
	            align-items: stretch;
	            margin: 0px 0px 0px 0px;
	            padding: 0px 0px 0px 0px;
	            width: 100%;
	            box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.40);
	            overflow: hidden;
	            border-radius: 15px;
	            animation: popup 0.2s ease-in-out 0.5s 1 backwards;
	        }
	        .header {
	            background-image: url("${chrome_extension_uri+"assets/header_hearts_shapes.svg"}");
	            display: flex;
	            flex-direction: column;
	            width: 100%;
	            margin: 0px 0px 0px 0px;
	            /* box-shadow: 2px 3px 20px 0px rgba(255, 0, 235, 0.94); */
	            z-index: 1;
	        }
	        .sounds {
	            position: absolute;
	            width: 27px;
	            height: 27px;
	            /*background-color: black;*/
	            display: flex;
	            flex-wrap: wrap;
	            justify-content: flex-end;
	            margin: 15px 0px 0px 18px;
	            z-index: 90;
	        }
	        .name {
	            font-family: arial black;
	            font-size: 20px;
	            margin-top: 0px;
	            margin-bottom: 0px;
	            color: #ffb74d; 
	            user-select: none;
	        }
	        .description {
	            color: white;
	            font-family: arial;
	            font-weight: bold;
	            font-size: 15px;
	            margin-top: 0px;
	            margin-bottom: 5px;
	            user-select: none;
	        }
	        .author {
	            display: flex;
	            flex-direction: column;
	            align-items: center;
	            margin: 0px 0px 15px 0px;
	            user-select: none;
	        }
	        .author a {
	            font-family: arial;
	            color: #EE82EE;
	            font-size: 8.5px;
	            margin-top: 0px;
	            text-decoration: none;
	        }
	        .logo {
	            display: flex;
	            justify-content: center;
	            align-items: center;

	            width: 100%;
	        }
	        .logo img {
	            width: 76px;
	            height: 140px;
	            border-radius: 18px;
	            transform: perspective(400px) rotatex(36deg);
	            border-bottom-left-radius: 35px;
	            border-bottom-right-radius: 35px;   
	            box-shadow: 0px 0px 30px 0px rgb(255, 255, 255);
	        }
	        .app_identity {
	            display: flex;
	            justify-content: center;
	            align-items: center;
	            flex-direction: column;
	        }
	        .content {
	            display: flex;
	            flex-wrap: wrap;
	            flex-direction: column;
	            align-items: stretch;
	            width: 100%;
	            background-color: black;
	            z-index: 2;
	            box-shadow: -2px 5px 20px 20px rgb(0, 0, 0);
	        }
	        .selection_menu {
	            display: flex;
	            justify-content: space-between;
	            align-items: center;
	            flex-direction: column;

	            visibility: ;
	            width: 100%;
	        }
	        .speed {
	            display: flex;
	            flex-direction: row;
	            justify-content: space-between;
	            align-items: center;
	            width: 213px;
	        }
	        .speed_button {
	            opacity: 1;
	        }
	        .selection_menu button {/*
	            display: flex;
	            box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.30);
	            background: rgb(237,30,121);
	            background: linear-gradient(45deg, rgba(237,30,121,1) 5%, rgba(102,45,140,1) 95%);
	            font-family: arial black;
	            color: white;
	            border-style: solid;
	            border-color: #bdbdbd;
	            border-width: 1px;
	            border-radius: 20px;
	            padding: 6.5px;
	            width: 66.55px;*/
	        }
	        .autolike_posts {
	            background: rgb(237,30,121);
	            background: linear-gradient(45deg, rgba(237,30,121,1) 5%, rgba(102,45,140,1) 95%);
	            font-family: arial black;
	            color: white;
	            border-style: none;
	            border-radius: 20px;

	            font-size: 13px;
	            border-color: #bdbdbd;
	            border-width: 1px;
	            padding: 6.5px;
	            width: 139px;

	            margin: 18px 0px 13px 0px;      
	        }
	        .autolike_posts:hover {
	            padding: 11.5px;
	            width: 149px;
	            box-shadow: 0px 0px 30px 0px rgba(255, 0, 235, 0.41);
	        }
	        .download_posts {
	            background: rgb(237,30,121);
	            background: linear-gradient(45deg, rgba(237,30,121,1) 5%, rgba(102,45,140,1) 95%);
	            font-family: arial black;
	            color: white;
	            border-style: none;
	            border-radius: 20px;
	            
	            font-size: 13px;
	            border-color: #bdbdbd;
	            border-width: 1px;
	            padding: 6.5px;
	            width: 139px;

	            margin: 0px 0px 13px 0px;
	        }   
	        .download_posts:hover {
	            padding: 11.5px;
	            width: 149px;
	            box-shadow: 0px 0px 30px 0px rgba(255, 0, 235, 0.41);
	        }
	        .unfollowers {
	            background: rgb(237,30,121);
	            background: linear-gradient(45deg, rgba(237,30,121,1) 5%, rgba(102,45,140,1) 95%);
	            font-family: arial black;
	            color: white;
	            border-style: none;
	            border-radius: 20px;
	            
	            font-size: 13px;
	            border-color: #bdbdbd;
	            border-width: 1px;
	            padding: 6.5px;
	            width: 139px;

	            margin: 0px 0px 18px 0px;
	        }   
	        .unfollowers:hover {
	            padding: 11.5px;
	            width: 149px;
	            box-shadow: 0px 0px 30px 0px rgba(255, 0, 235, 0.41);
	        }

	        .autolike_section {
	            width: 100%;

	            display: flex;
	            flex-direction: column;
	            justify-content: center;
	            align-items: center;
	        }
	        .posts_qty {
	            display: flex;
	            flex-direction: column;
	            justify-content: center;
	            align-items: center;
	        }
	        .footer {
	            margin: 24px 0px 0px 0px;
	            display: flex;
	            justify-content: center;
	            align-items: center;
	            width: 100%;
	        }
	        .unselected_button_shadow {
	            box-shadow: inset rgb(0, 0, 0) 0px 0px 30px 0px;
	        }
	        @keyframes popup {
	            0% {
	                width: 0px;
	                height: 0px; 
	                opacity: 0.35; 
	                filter: blur(20px);         
	            }
	            65% {
	                width: 240px;
	                height: 220px;
	                opacity: 1;         
	            }
	            35% {
	                width: 220px;
	                height: 200px;      
	            }
	        }
	    </style>
	`
    let body = document.getElementsByTagName("body")[0];
    let html_inject = HTML_CSS; 
    body.insertAdjacentHTML("afterbegin", html_inject); 

    play_sound(chrome_extension_uri+"samples/start_app.ogg", "start_app_sound");

   	if ( autolike === true ) {
   		change_content_section();
   	}
}

inject_autoliker_modal();
