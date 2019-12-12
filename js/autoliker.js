const like_photo = ()=>{
    const filled_heart = "glyphsSpriteHeart__filled__24__red_5";
    const unfilled_heart = "glyphsSpriteHeart__outline__24__grey_9";
    const like_btn = document.getElementsByClassName("eo2As")[0].children[0].children[0].children[0].children[0];
    const instagramSelectors = [];

    instagramSelectors.push(like_btn.className.split(" "));
    /*
        check if unfilled_heart or filled_heart is present in like_btn Selectors.
    */
    for (let i = 0; i < instagramSelectors[0].length; i++) {
        /*
            like post if unfilled_heart is present in like_btn slectors.
        */
        if (instagramSelectors[0][i] === unfilled_heart) {
            liked_images += 1;  

            like_btn.focus();
            like_btn.click();
            play_sound(chrome_extension_uri+"samples/like_sound.m4a", "liked_post");
            liked_post_animation(liked_images);
            break;
        }
    }
}

const click_thumbnail = (thumbnail_number)=>{
    const thumbnail = document.getElementsByClassName("SCxLW  o64aR")[0].getElementsByClassName(" eLAPa")[(thumbnail_number - 1)];
    thumbnail.focus();
    thumbnail.click();
}

const autoliker_off = () => {
    liked_images = 0;
    qty_images = 0;
    clearInterval(conn_checker);
    clearInterval(post_observer);
    clearTimeout(b);
    remove_app_modal();
}

const exit_post = ()=>{
    let exit_post = document.getElementsByClassName("_2dDPU vCf6V")[0];

    autoliker_off();
    if ( exit_post ) {
        exit_post = document.getElementsByClassName("_2dDPU vCf6V")[0].getElementsByClassName("ckWGn")[0];
        exit_post.focus();
        exit_post.click();
    }
}

const go_next_post = ()=>{
    const next_post_arrow = document.getElementsByClassName("_2dDPU vCf6V")[0].getElementsByClassName("coreSpriteRightPaginationArrow")[0];
    const exit_post = document.getElementsByClassName("_2dDPU vCf6V")[0].getElementsByClassName("ckWGn")[0];

    if (next_post_arrow) {
        next_post_arrow.focus();
        next_post_arrow.click();
    } else {
        exit_post.click();
        autoliker_off();
    }
}

const time_ramdomizer = (speed) => {
   let time_stamp = parseInt(Date.now().toString().split("").splice(0, 11).pop());
   
   switch (time_stamp) {
        case 0:
            switch (speed) {
                case "fast":
                    return time_stamp = 1.1;
                    break;
                case "mid": 
                    return time_stamp = 3.2;
                    break;
                case "slow":
                    return time_stamp = 5.2;
                    break; 
            } 
            break;
        case 1:
            switch (speed) {
                case "fast":
                    return time_stamp = 1.2;
                    break;
                case "mid": 
                    return time_stamp = 3.4;
                    break;
                case "slow":
                    return time_stamp = 5.4;
                    break; 
            } 
            break;
        case 2:
            switch (speed) {
                case "fast":
                    return time_stamp = 1.3;
                    break;
                case "mid": 
                    return time_stamp = 3.6;
                    break;
                case "slow":
                    return time_stamp = 5.6;
                    break; 
            } 
            break;
        case 3:
            switch (speed) {
                case "fast":
                    return time_stamp = 1.4;
                    break;
                case "mid": 
                    return time_stamp = 3.8;
                    break;
                case "slow":
                    return time_stamp = 5.8;
                    break; 
            } 
            break;
        case 4:
            switch (speed) {
                case "fast":
                    return time_stamp = 1.5;
                    break;
                case "mid": 
                    return time_stamp = 4.1;
                    break;
                case "slow":
                    return time_stamp = 6.1;
                    break; 
            } 
            break;
        case 5:
                switch (speed) {
                    case "fast":
                        return time_stamp = 1.6;
                        break;
                    case "mid": 
                        return time_stamp = 4.3;
                        break;
                    case "slow":
                        return time_stamp = 6.3;
                        break; 
                } 
                break;
        case 6:
                switch (speed) {
                    case "fast":
                        return time_stamp = 1.7;
                        break;
                    case "mid": 
                        return time_stamp = 4.5;
                        break;
                    case "slow":
                        time_stamp = 6.5;
                        break; 
                } 
                break;
        case 7:
                switch (speed) {
                    case "fast":
                        return time_stamp = 1.8;
                        break;
                    case "mid": 
                        return time_stamp = 4.7;
                        break;
                    case "slow":
                        return time_stamp = 6.7;
                        break; 
                } 
                break;
        case 8:
                switch (speed) {
                    case "fast":
                        return time_stamp = 1.9;
                        break;
                    case "mid": 
                        return time_stamp = 5.1;
                        break;
                    case "slow":
                        return time_stamp = 7.1;
                        break; 
                } 
                break;
        case 9:
                switch (speed) {
                    case "fast":
                        return time_stamp = 1.98;
                        break;
                    case "mid": 
                        return time_stamp = 5;
                        break;
                    case "slow":
                        return time_stamp = 5;
                        break; 
                } 
                break;  
   }   
}
/*
    CHECK IF CONECTION IS LOST OR POST IDIDNT LOAD AND GO NEXT POST:
*/
let conn_checker;
const conection_lost = () => {
    conn_checker = setInterval(()=>{
        let element = document.getElementsByTagName("article")[1];
        if (!element) {
            go_next_post();
            console.log('conn lost');
        }
    }, 9000); 
} 

const counter_icon = (num_value) => {
   if (!document.getElementsByClassName("remaining_time_to_like")[0]) {
        let post = document.getElementsByClassName("PdwC2 _6oveC Z_y-9")[0];
        let timer_icon = document.createElement("div");
        timer_icon.className = "remaining_time_to_like";
        timer_icon.innerHTML = `${num_value}`;

        let timer_icon_style = document.createElement("style");
        timer_icon_style.className = "remaining_time_to_like_styles";
        timer_icon_style.innerHTML = `
        .remaining_time_to_like {
            width: 45px;
            height: 45px;
            position: absolute;
            align-self: baseline;
            justify-content: center;
            align-items: center;
            border-radius: 200px;
            margin-top: 20px;
            margin-left: 25px;
            z-index: 90;
            background-color: white;
            color: black;
            font-family: cursive; 
            font-weight: bold;
            font-size: 12px;

            animation-name: example;
            animation-duration: 1s;
            animation-iteration-count: ${num_value};
        }

            @keyframes example {
              0% {        
                width: 35px;
                height: 35px;
                background-color: white;
              }
              20% {       
                width: 45px;
                height: 45px;
                background-color: #DCDCDC;
              }
              100% {          
                width: 35px;
                height: 35px;
                background-color: white;
              }
            }
        `;

        post.append(timer_icon_style);
        post.append(timer_icon);       
    } else {
        document.getElementsByClassName("remaining_time_to_like")[0].innerHTML = num_value;
    }
}

const liked_post_animation = (num_value) => {
   if (!document.getElementsByClassName("liked_post_container")[0]) {
        let post = document.getElementsByClassName("PdwC2 _6oveC Z_y-9")[0];
        let liked_post_animation = document.createElement("div");
        liked_post_animation.className = "liked_post_container";
        liked_post_animation.innerHTML = `  <div class="interpolated_text">${num_value}</div>
    <img src="${chrome_extension_uri+"assets/solo_corazon.png"}" width="117px" style="align-self: center;">`;

        let liked_post_animation_style = document.createElement("style");
        liked_post_animation_style.className = "liked_post_container_styles";
        liked_post_animation_style.innerHTML = `
        .liked_post_container {
            position: absolute;
            align-self: baseline;
            margin: 0px 0px 0px 9.5%;
            opacity: 0;
            animation-name: liked_post_animation;
            animation-duration: 1.5s;
            width: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .interpolated_text {
            position: absolute;
            color: white;
            font-weight: bold;
            font-size: 25px;
            font-family: cursive;
            text-align: center;
            align-self: center;
            z-index: 20;
            margin-left: 2px;
        }
        @keyframes liked_post_animation {
            0% {        
                top: 190px;
                opacity: 0;
            }
            70% {          
                top: 40px;
                opacity: 1;
            }
            100% {
                top: 0px;
                opacity: 0;
            }
        }
        `;

        post.append(liked_post_animation_style);
        post.append(liked_post_animation);       
    } else {
        document.getElementsByClassName("liked_post_container")[0].remove();
        liked_post_animation(num_value);
    }
}

let liked_images = 0;
let qty_images = 0;
let post_observer;
let b;
const main = (speed_input, total_images) => {
    qty_images = total_images;
    const time = time_ramdomizer(speed_input);                 //time for post observer.
    post_observer = setInterval(
        () => {
            let ig_post = document.getElementsByClassName("_97aPb")[0]; 
            if (ig_post) {
                document.getElementsByClassName("ckWGn")[0].setAttribute("onclick", "autoliker_off();")
                ig_post = document.getElementsByClassName("_97aPb")[0].getElementsByTagName("video")[0] || document.getElementsByClassName("_97aPb")[0].getElementsByTagName("img")[0];
            } 

            if ((ig_post && ig_post.naturalWidth > 0) || (ig_post && ig_post.offsetWidth > 0)) {                  //If post image is rendered.
                
                const like_btn = document.getElementsByClassName("eo2As")[0].children[0].children[0].children[0].children[0];

                if (like_btn) {
                    if (ig_post.offsetWidth > 0) {
                        clearInterval(conn_checker);            //for lost newtwork conn purposse
                        /*
                            SHOW REMAINING TIME TO NEXT LIKE:
                        */
                        const like_time = time_ramdomizer(speed_input);            //time to like.
                        const next_btn_time = time_ramdomizer(speed_input);        //time to go next post.
                        let count = (like_time+next_btn_time)-time;

                        clearInterval(post_observer);

                        if (liked_images < qty_images) {
                            const a = setInterval(()=>{
                                /*
                                    TIMER ANIMATION ICON FOR LIKING TIME:
                                */
                                counter_icon(parseFloat(count.toString().slice(0,4)));
                                console.log(count);
                                count -= 1;
                                if (count < 0) {                                 
                                    clearInterval(a); 
                                    like_photo();
                                    b = setTimeout(() => { 
                                        console.clear();
                                        clearInterval(conn_checker); //for lost newtwork conn purposse
                                        conection_lost();            //for lost newtwork conn purposse
                                        if (liked_images < qty_images) {
                                            document.getElementsByClassName("remaining_time_to_like")[0].remove(); //remove counter animation icon with old value.
                                            go_next_post();
                                        }
                                        main(speed_input, qty_images); 
                                        clearTimeout(b);
                                    }, next_btn_time*1000); 
                                    console.log(`liked_images: ${liked_images} qty_images: ${qty_images}`);
                                }
                            },1000); 
                        } else {
                            exit_post();
                            play_sound(chrome_extension_uri+"samples/autolike_ends.m4a", "all_posts_liked");
                        }                                 
                    }
                }
                
            } 
        }
    , time*1000);
}