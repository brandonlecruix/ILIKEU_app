const inject_unfollower_message = ( message ) => {
	if ( !document.getElementsByClassName("fetching_unfollowers_message")[0] && !document.getElementsByClassName("unfollowers_msg_styles")[0] ) {
		const html = 
		`
		<div class="fetching_unfollowers_message">
			<h1 class="Fetching_message">${message}</h1>
			<img src="${chrome_extension_uri+"assets/unfollowers_loading.gif"}" width="150px">
		</div>
		<style type="text/css" class="unfollowers_msg_styles">
			.fetching_unfollowers_message {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: 100%;
				height: 100%;
				background-color: black;
				color: white;
				font-family: roboto;
				z-index: 150;
				opacity: 0.6;
				font-size: 20px;
			}
		</style>
		`;
		const content = document.getElementsByClassName("unfollowers_container")[0];
		content.insertAdjacentHTML("afterbegin", html);	
	}
}

let button_index = unfollowers;
const insert_unfollower_item = ( profile_pic_url, username, name, id, el_name ) => {
	const html = 
	`
	<div class="unfollower_item" name="${el_name}">
		<img src="${profile_pic_url}">
		<div class="data">
			<p><a href="https://instagram.com/${username}" class="unfollower_username" target="_blank">
				${username}
			</a></p>
			<p class="unfollower_name">
				${name}
			</p>
		</div>
		<button class="unfollow_button" onclick="unfollow_user(${id}, ${el_name});">
			Unfollow
		</button>
	</div>
	`;
	const content = document.getElementsByClassName("unfollowers_content")[0];
	content.insertAdjacentHTML("afterbegin", html);
	button_index -= 1;
}

const inject_unfollowers_context = () => {
	if ( document.getElementsByClassName("unfollowers_container")[0] && document.getElementsByClassName("unfollowers_modal_styles")[0] ) {
		delete_unfollowers_element("unfollowers_container");
		delete_unfollowers_element("unfollowers_modal_styles");
	}
	const HTML_CSS = 
	`
	<div class="unfollowers_container">
		<img src="${chrome_extension_uri+"assets/cancel.png"}" class="cancel_unfollowers_modal" onclick="delete_unfollowers_element(true); clean_results();">
		<div class="unfollowers_bg"></div>
	</div>

	<style type="text/css" class="unfollowers_modal_styles">
		.unfollowers_container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			z-index: 100;
			position: fixed;
		}
		.unfollowers_bg {
			background-color: black;
			opacity: 0.7;
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 101;
		}
		.unfollowers_modal {
			display: flex;
			flex-direction: column;

			min-height: 40%;
			max-height: 85%;
			width: 420px;
			background-color: black;
			z-index: 102;
			border-radius: 12px;
			overflow: hidden;
			animation: popup 0.2s ease-in-out 0.5s 1 backwards; 
			box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.40);
		}
		.unfollowers_header {
	        background-image: linear-gradient(45deg, #ed1e79 5%, rgba(102,45,140,1) 95%);
	        display: flex;
	        flex-direction: column;
	        width: 100%;
	        height: 103px;
	        align-items: center;
	        justify-content: space-around;
		}
		.unfollowers_header p {
			top: 12px;
			position: absolute;
			font-family: roboto;
		    font-size: 20px;
		    color: white;
		}
		.unfollowers_content {
			height: 77%;
			display: flex;
		    align-items: center;
			flex-direction: column;

			overflow: scroll;	
			padding-top:  24px;	
		}
		.data {
		    overflow: hidden;
		    max-width: 52%;
		}
		.unfollower_item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: row;

			padding: 5px;
			width: 90%;
			height: 60px;
			background-color: #101010;

			border: solid;
			border-width: 1px;
			border-color: gray;
			border-radius: 5px;
			margin-bottom: 15px;
			animation: item 0.2s ease-in-out 0.5s 1 backwards; 
		}
		.unfollower_item:hover {
			padding: 8.5px;
		    width: 403px;
		    height: 71px;
	        box-shadow: 0px 0px 30px 0px rgba(255, 0, 235, 0.41);
		}
		.unfollower_item img {
			width: 45px;
			border-radius: 22px;
			margin: 0px 0px 0px 10px;
		}
		.unfollower_username {
		    font-family: roboto;
		    font-weight: bold;
		    font-size: 17px;
		    color: white;
		   	text-decoration: none;
		   	z-index: 15;
		}
		.unfollower_username:hover {
			color: #ffb74d;
		}
		.unfollower_name {
		    font-family: roboto;
		    font-weight: bold;
		    font-size: 11px;
		    color: #5b5b5b;
		    margin-top: 2px;
		}
		.unfollower_item button {
		    background: rgb(237,30,121);
		    background: linear-gradient(45deg, rgba(237,30,121,1) 5%, rgba(102,45,140,1) 95%);
		    font-family: arial black;
		    color: white;
		    border-style: none;
		    border-radius: 20px;
		    font-size: 13px;
		    border-color: #bdbdbd;
		    border-width: 1px;
		    padding: 6px;
		    width: 84px;
		    margin: 0px 10px 0px 0px; 
		}
	    .unfollower_item button:hover {
	        padding: 12.5px;
	        width: 117px;
	        box-shadow: 0px 0px 30px 0px rgba(255, 0, 235, 0.41);
	    }
	    .unfollower_item button:active {
	    	opacity: 0.7;
	    }
		.items_shadow {
		    display: flex;
		    width: 100%;
		    height: 1%;
		    box-shadow: -1px 9px 20px 20px rgb(0, 0, 0);
		    z-index: 9;
		}
		.qty_unfollowers {
		    font-family: roboto;
		    top: 26px;
		    color: #ffb74d;
		    font-size: 22px;
		}
		.SPACING_ITEM {
			visibility: hidden;
		}
		::-webkit-scrollbar {
			display: none;
		}
	    @keyframes popup {
	        0% {
	        	width: 0%;
	        	height: 0%;
	            opacity: 0.35; 
	            filter: blur(20px);         
	        }
	        65% {
	        	width: 20%;
	        	height: 60%;
	            opacity: 1;  
	            filter: blur(80px);        
	        }
	        35% {
	    		filter: blur(0px);  
	        }
	    }
	    .filter_container {
		    position: relative;
		    display: flex;
		    flex-direction: row;
		    width: 100%;
		    justify-content: space-between;
		    font-size: 9px;
		    color: white;
		    font-weight: lighter;
		    background-color: #00000040;
		    padding: 6px 10px 10px 10px;
		    top: 12px;	    	
	    }
	    .filter_item:hover {
		    top: -5px;
		    font-size: 22px;
		    font-weight: bold;
		    cursor: pointer;
	    }
	    @keyframes item {
	        0% {
	        	width: 0%;
	        	height: 0px;  
	        	opacity: 0.5;      
	        }
	        85% {
	        	width: 94%;
	        	height: 70px; 
	        	opacity: 1;         
	        }
	        100% {
	        	width: 74%;
	        	height: 50px;
	 
	        }
	    }
    	.cancel_unfollowers_modal {
		    position: absolute;
		    right: 0%;
		    top: 0%;
		    z-index: 130;
		    margin: 1% 1% 0% 0%;
    	}
	</style>
	`;

    let body = document.getElementsByTagName("body")[0];
    let html_inject = HTML_CSS; 
    body.insertAdjacentHTML("afterbegin", html_inject); 
}	

const inject_unfollowers_modal = ( num_unfollowers ) => {
	const HTML_CSS =
	`
	<div class="unfollowers_modal">
		<div class="unfollowers_header">
			<p>
				Current unfollowers
			</p>
			<div class="qty_unfollowers">${num_unfollowers}</div>
			<div class="filter_container">
				<div class="filter_item" onclick="sort_unfollowers_items_list('a');">A</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('b');">B</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('c');">C</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('d');">D</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('e');">E</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('f');">F</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('g');">G</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('h');">H</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('i');">I</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('j');">J</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('k');">K</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('l');">L</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('m');">M</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('n');">N</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('ñ');">Ñ</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('o');">O</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('p');">P</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('q');">Q</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('r');">R</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('s');">S</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('t');">T</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('u');">U</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('v');">V</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('w');">W</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('x');">X</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('y');">Y</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('z');">Z</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('1');">1</div>
			    <div class="filter_item" onclick="sort_unfollowers_items_list('/_.');">/_.</div>
			</div>
		</div>
		<div class="items_shadow"></div>
		<div class="unfollowers_content">
		</div>
		<div class="items_shadow"></div>
	</div>
	`
    let body = document.getElementsByClassName("unfollowers_container")[0];
    let html_inject = HTML_CSS; 
    body.insertAdjacentHTML("beforeend", html_inject); 

    //play_sound(chrome_extension_uri+"samples/start_app.ogg", "start_app_sound");
}

const delete_unfollowers_element = ( element_class ) => {
	if ( element_class !== true ) {
		document.getElementsByClassName(element_class)[0].remove();
	} else {
		document.getElementsByClassName("unfollowers_container")[0].remove();
		document.getElementsByClassName("unfollowers_modal_styles")[0].remove();
	}
}