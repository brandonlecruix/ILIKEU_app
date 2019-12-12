/*
    THIS OCDE IMPLEMENTS THE 'download-files.js' MODULE.
*/
const exit_post = ()=>{
    const exit_post = document.getElementsByClassName("_2dDPU vCf6V")[0].getElementsByClassName("ckWGn")[0];
    exit_post.focus();
    exit_post.click();
}

const go_next_post = ()=>{
    const next_post_arrow = document.getElementsByClassName("_2dDPU vCf6V")[0].getElementsByClassName("coreSpriteRightPaginationArrow")[0];
    const exit_post = document.getElementsByClassName("_2dDPU vCf6V")[0].getElementsByClassName("ckWGn")[0];

    if (next_post_arrow) {
        next_post_arrow.focus();
        next_post_arrow.click();
    } else {
        exit_post.click();
    }
}

const time_ramdomizer = (speed) => {
   let time_stamp = parseInt(Date.now().toString().split("").splice(0, 11).pop());
   
   switch (time_stamp) {
        case 0:
            switch (speed) {
                case "rapido":
                    return time_stamp = 1.1;
                    break;
                case "medio": 
                    return time_stamp = 3.2;
                    break;
                case "lento":
                    return time_stamp = 5.2;
                    break; 
            } 
            break;
        case 1:
            switch (speed) {
                case "rapido":
                    return time_stamp = 1.2;
                    break;
                case "medio": 
                    return time_stamp = 3.4;
                    break;
                case "lento":
                    return time_stamp = 5.4;
                    break; 
            } 
            break;
        case 2:
            switch (speed) {
                case "rapido":
                    return time_stamp = 1.3;
                    break;
                case "medio": 
                    return time_stamp = 3.6;
                    break;
                case "lento":
                    return time_stamp = 5.6;
                    break; 
            } 
            break;
        case 3:
            switch (speed) {
                case "rapido":
                    return time_stamp = 1.4;
                    break;
                case "medio": 
                    return time_stamp = 3.8;
                    break;
                case "lento":
                    return time_stamp = 5.8;
                    break; 
            } 
            break;
        case 4:
            switch (speed) {
                case "rapido":
                    return time_stamp = 1.5;
                    break;
                case "medio": 
                    return time_stamp = 4.1;
                    break;
                case "lento":
                    return time_stamp = 6.1;
                    break; 
            } 
            break;
        case 5:
                switch (speed) {
                    case "rapido":
                        return time_stamp = 1.6;
                        break;
                    case "medio": 
                        return time_stamp = 4.3;
                        break;
                    case "lento":
                        return time_stamp = 6.3;
                        break; 
                } 
                break;
        case 6:
                switch (speed) {
                    case "rapido":
                        return time_stamp = 1.7;
                        break;
                    case "medio": 
                        return time_stamp = 4.5;
                        break;
                    case "lento":
                        time_stamp = 6.5;
                        break; 
                } 
                break;
        case 7:
                switch (speed) {
                    case "rapido":
                        return time_stamp = 1.8;
                        break;
                    case "medio": 
                        return time_stamp = 4.7;
                        break;
                    case "lento":
                        return time_stamp = 6.7;
                        break; 
                } 
                break;
        case 8:
                switch (speed) {
                    case "rapido":
                        return time_stamp = 1.9;
                        break;
                    case "medio": 
                        return time_stamp = 5.1;
                        break;
                    case "lento":
                        return time_stamp = 7.1;
                        break; 
                } 
                break;
        case 9:
                switch (speed) {
                    case "rapido":
                        return time_stamp = 1.98;
                        break;
                    case "medio": 
                        return time_stamp = 5;
                        break;
                    case "lento":
                        return time_stamp = 5;
                        break; 
                } 
                break;  
   }   
}

const main = (speed_input) => {
    const time = time_ramdomizer(speed_input);                 //time for post observer.
    const post_observer = setInterval(
        () => {
            let ig_post = document.getElementsByClassName("_97aPb")[0].getElementsByTagName("video")[0] || document.getElementsByClassName("_97aPb")[0].getElementsByTagName("img")[0];  
         
            if ((ig_post && ig_post.naturalWidth > 0) || (ig_post && ig_post.offsetWidth > 0)) {                  //If post image is rendered.
                
                const like_btn = document.getElementsByClassName("eo2As")[0].children[0].children[0].children[0].children[0];

                if (like_btn) {
                    if (ig_post.offsetWidth > 0) {
                        /*
                            SHOW REMAINING TIME TO NEXT LIKE.
                        */
                        const like_time = time_ramdomizer(speed_input);            //time to like.
                        const next_btn_time = time_ramdomizer(speed_input);        //time to go next post.
                        let count = (like_time+next_btn_time)-time;
                        clearInterval(post_observer);
                        const a = setInterval(()=>{
                            //console.log(count);
                            count -= 1;
                            if (count < 0) {
                                clearInterval(a); 
                            
                            	let extension;
                            	switch (ig_post.className) {
                            		case "FFVAD": //image
                            			extension = "png";
                            			break;
                            		case "tWeCl": //video IG TV
                            		case "_8jZFn": //video
                            			extension = "mp4";
                            			break;
                            	}
                                let username = document.getElementsByClassName("FPmhX notranslate nJAzx")[0].title;
                                download_file(ig_post.src, username, extension);
                               
                           
                                let b = setTimeout(() => { 
                                    go_next_post();
                                    main(speed_input); 
                                    clearTimeout(b);
                                }, next_btn_time*1000);  
                            }
                        },1000);                                 
                    }
                }
                
            }  
        }
    , time*1000);
}
main('medio');