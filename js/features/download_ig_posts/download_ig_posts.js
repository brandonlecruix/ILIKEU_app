/*
	THIS CODE IMPLEMENTS THE 'download-files.js' MODULE.
*/
const insert_download_bar = (element_index, set_text) => {
	if ( !set_text ) {
		const a = setInterval(()=>{
			let post;
			let ig_pathname = window.location.pathname;

			if ( ig_pathname !== "/" ) {
				post = document.getElementsByClassName("_97aPb ")[0];
			} else {
				post = document.getElementsByName(element_index)[0].parentElement || document.getElementsByName(element_index)[0].parentElement;
			}

			if ( post ) {
				const download_bar = `
					<span class="BHkOG PID-B download_file" style="
						top: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
					    color: white;
					    font-family: arial black;
					    position: absolute;
					    height: 40px;
					    background: #27c4f5 -webkit-gradient(linear,left top,right top,from(#27c4f5),color-stop(#a307ba),color-stop(#fd8d32),color-stop(#70c050),to(#27c4f5));
					    background: #27c4f5 -webkit-linear-gradient(left,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5);
					    background: #27c4f5 linear-gradient(to right,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5);
					    background-size: 500%;
					    -webkit-animation: 2s linear infinite LoadingBarProgress,.5s ease-out LoadingBarEnter;
					    animation: 2s linear infinite LoadingBarProgress,.5s ease-out LoadingBarEnter;
					    -webkit-transform-origin: left;
					    transform-origin: left;
					    width: 100%;
					    z-index: 9999999999;
					">DOWNLOADING ...</span>

					<style type="text/css">
					.PID-B	{
						left: 0;
					    position: fixed;
					    right: 0;
					    top: 0;
					    z-index: 12;
					}
					@keyframes LoadingBarProgress{
						0%{background-position:0% 0}
						to{
							background-position:125% 0
						}
					}
					@keyframes LoadingBarEnter{
						0%{
							-webkit-transform:scaleX(0);transform:scaleX(0)
						}
						to{
							-webkit-transform:scaleX(1);transform:scaleX(1)
						}
					}
					</style>
				`;
				post.insertAdjacentHTML("afterbegin", download_bar);	
				clearInterval(a);		
			}
		}, 10);
	} else {
		let bar = document.getElementsByClassName("download_file")[0];
		bar.innerHTML = set_text;	

		setTimeout(()=>{
			if ( bar ) {
				bar.remove();
			}
		}, 3500);
	}
}
const button_background = () => {
	let bcgrnd = document.createElement("div");
	bcgrnd.style = `
	position: absolute;
    top: -3%;
    left: -3%;
    width: 100%;
    height: 100%;
    padding: 53%;
    z-index: 0;
	background: #ed1e79;
	background: linear-gradient(45deg, #ed1e79 5%, rgba(102,45,140,1) 95%);
    opacity: 1;
	`;
	bcgrnd.className = "bcgrnd";
	return bcgrnd;
}
const download_posts_off = () => {
	clearInterval(a);
	let download_buttons = document.getElementsByClassName("bcgrnd");
	let body = document.getElementsByTagName("body")[0];
	let interv = setInterval(()=>{
		download_buttons = document.getElementsByClassName("bcgrnd");
		if ( download_buttons.length != 0  ) {
			for (let i = 0; i < download_buttons.length; i++ ) {
				if ( document.getElementsByClassName("div_button") ) {
					document.getElementsByClassName("bcgrnd")[i].remove();
					document.getElementsByClassName("div_button")[i].remove();
				}
			}
		} else {
			clearInterval(interv);
			console.log('done.');
		}
	}, 90);

	body.onscroll = "";
}

const button = () => {
	let button = document.createElement("div");
	button.style = "position: absolute; width: 100%; height: 0%; z-index: 1; /*background-color: red;*/ opacity: 1;";
	button.className = "div_button";
	button.innerHTML = `
	<button class="download_icon" style="
		background-color: #2766f5;
	    color: white;
	    font-weight: bold;
	    width: 96px;
	    height: 13%;
	    min-height: 35.2px;
	    max-height: 4%;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    border-radius: 8px;
	    align-self: flex-end;
	    margin: 4% 5% 0% 0%;
	    box-shadow: 0px 6px 20px 6px rgba(0, 0, 0, 0.30);
	    border-style: none;
	">DOWNLOAD</button>
	`;
	return button;	
}

let a;
const add_download_btn = () => {
	a = setInterval(()=>{
		let ig_pathname = window.location.pathname;
		let thumbs;
		let insert_downloader_fn;
		const posts_available = document.getElementsByClassName("SCxLW uzKWK ")[0] || document.getElementsByClassName("SCxLW  o64aR")[0];

		if ( posts_available && posts_available.getElementsByClassName(" eLAPa") !== [] ) {
			const add_attribute = (attr) => {
				for(let i = 0; i < thumbs.length; i++) {
					if (thumbs[i].getElementsByClassName("div_button").length === 0) {
						thumbs[i].insertBefore(button_background(), thumbs[i].children[0]);
						thumbs[i].insertBefore(button(), thumbs[i].children[0]);
						if ( !attr ) {
							let username = document.getElementsByClassName("div_button")[i].parentElement.getElementsByClassName(" BrX75")[0].children[0].innerHTML;
							let ramdon_num_as_id = Math.round(Math.random()*10) * Math.round(Math.random()*10); 
							let fn_ = 
							`
							(()=>{
								let post_type = document.getElementById('${username+ramdon_num_as_id}').parentElement.parentElement.getElementsByTagName('video')[0] ||
												document.getElementById('${username+ramdon_num_as_id}').parentElement.parentElement.getElementsByTagName('img')[1];								
								if ( post_type ) {
									post_type.setAttribute('name', '${username+ramdon_num_as_id}');
								}
							})();
							`;

							document.getElementsByClassName("download_icon")[i].setAttribute("onfocus", `${fn_}`);
							document.getElementsByClassName("download_icon")[i].setAttribute("id", `${username+ramdon_num_as_id}`);
							document.getElementsByClassName("download_icon")[i].setAttribute("onclick", `insert_downloader('${username+ramdon_num_as_id}');`);
						} else {
							document.getElementsByClassName("div_button")[i].children[0].setAttribute("onclick", attr);
						}
					}
				}
			}

			if ( ig_pathname !== "/" ) {
				thumbs = posts_available.getElementsByClassName(" eLAPa");
				if ( thumbs.length === 0 ) {
					thumbs = posts_available.getElementsByClassName("lVhHa RNL1l"); //Gotta finish this for direct download from ig tv posts.
				}

				insert_downloader_fn = `insert_downloader();`;
				add_attribute(insert_downloader_fn);
			} else {
				thumbs = document.getElementsByTagName("article");
				add_attribute();
			}	
		}
	}, 90)
}

const insert_downloader = (element_index) => {
    const post_observer = setInterval(
        () => {
        	let ig_post;
        	let username;

            if ( element_index ) {
            	ig_post = document.getElementsByName(element_index)[0];

	            if (ig_post) {
	            	username = element_index;
	            } 
            } else {
            	ig_post = document.getElementsByClassName("_97aPb")[0];

	            if (ig_post) {
	            	username = document.getElementsByClassName("FPmhX notranslate nJAzx")[0].title;
	                ig_post = ig_post.getElementsByTagName("video")[0] || ig_post.getElementsByTagName("img")[0]; 
	            } 
            }    

            if ((ig_post && ig_post.src.length > 0 && ig_post.naturalWidth > 0) || (ig_post && ig_post.src.length > 0 && ig_post.offsetWidth > 0)) {                  //If post image is rendered.  
                    clearInterval(post_observer);     
                	let extension;
                	switch (ig_post.className) {
                		case "FFVAD": //image
                			extension = "png";
                			break;
                		case "tWeCl": //video IG TV 1
                		//case "_bz0w": //video IG TV 2
                		case "_8jZFn": //video
                			extension = "mp4";
                			break;
                	}
                    insert_download_bar(element_index, "");
                    download_file(ig_post.src, username, extension, `(()=>{
                    	insert_download_bar("", 'FILE DOWNLOADED :)');
                    	setTimeout(()=>{ exit_post(); }, 1850);
                    })()`);                                        
            }  
        }
    , 100);
}
//execute:
/*
add_download_btn();
*/