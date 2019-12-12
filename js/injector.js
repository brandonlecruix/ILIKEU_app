var inject_chrome_ext_uri_and_id = () => {
    const body = document.getElementsByTagName("body")[0];
    const extension_uri = document.createElement("p");
    const extension_id = document.createElement("p");
    extension_uri.className = "chrome_extension_uri";   
    extension_uri.style.visibility = 'hidden';
    extension_uri.innerHTML = `${chrome.runtime.getURL("./")}`;

    extension_id.className = "chrome_extension_id";
    extension_id.style.visibility = 'hidden';
    extension_id.innerHTML = `${chrome.runtime.id}`;

    body.append(extension_uri);
    body.append(extension_id);
}

var inject_js_modules = () => {
    let modules;

    if ( !modules ) {
        modules = [ //place JS modules here.
            `${chrome.runtime.getURL("./js/play_sound.js")}`,
            `${chrome.runtime.getURL("./js/app_modal.js")}`,
            `${chrome.runtime.getURL("./js/autoliker.js")}`,
            `${chrome.runtime.getURL("./js/floating_menu.js")}`,
            `${chrome.runtime.getURL("./js/features/download_ig_posts/download_ig_posts.js")}`,
            `${chrome.runtime.getURL("./js/features/download_ig_posts/modules/download-files.js")}`,
            `${chrome.runtime.getURL("./js/features/unfollowers/unfollowers.js")}`,
            `${chrome.runtime.getURL("./js/features/unfollowers/unfollowers_modal.js")}`
        ];    
    };

    if ( modules ) {
        if ( modules[0] ) {
            const xhr = new XMLHttpRequest();

            for ( let i = 0; i < modules.length; i++ ) {
                xhr.open("get", modules[i], false);
                xhr.onload = () => {
                    let body = document.getElementsByTagName("body")[0];
                    let script = document.createElement("script");
                    script.type = "text/javascript";
                    script.className = "ilikeu_app module"+i;
                    script.innerHTML = xhr.response;
                    body.append(script);
                };
                xhr.send();
            }
        }       
    }
}

//check if user is logged in Instagram:
for (let i = 0; i < document.cookie.split(";").length; i++) {
    for (let y = 0; y < document.cookie.split(";")[i].split("=").length; y++) {
        //console.log(document.cookie.split(";")[i].split("=")[y]);
        if ( document.cookie.split(";")[i].split("=")[y] === " ds_user_id" ) {
            if ( !document.getElementsByClassName("ilikeu_app")[0] ) {
                inject_chrome_ext_uri_and_id();
                inject_js_modules();
            }
            break;
        } else if ( i === document.cookie.split(";").length-1 ) {
            alert("You have to log in Instagram."); 
            break;
        }
    }
}