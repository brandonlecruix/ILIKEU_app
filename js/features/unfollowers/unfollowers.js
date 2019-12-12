/*
	THE FOLLOWING CODE IMPLEMENTS time_ramdomizer function FROM autoliker.js MODULE.
*/

let username = __initialData["data"]["config"]["viewer"]["username"];
let items_list_followers = [];
let remaining_page;
let items_list_following = [];
let unfollowers_list = [];

const push_users_list = ( items, typeof_users ) => {
	if ( typeof_users === "followers" ) {
		items_list_followers.push(items);
	} else if ( typeof_users === "following" ) {
		items_list_following.push(items);
		unfollowers_list.push(items);
	}
}

const clean_results = () => {
	items_list_followers = [];
	items_list_following = [];
	unfollowers = 0;
	unfollowers_list = [];
	remaining_page = "";
	username = "";
}

let end_cursor;
const get_user_info = ( followingList_or_followersList, delay ) => {
	const xhr = new XMLHttpRequest();
	const id = __initialData.data.config.viewer.id;

	let query_hash;
	if ( followingList_or_followersList === "followers" ) {
		query_hash = "c76146de99bb02f6415203be841dd25a";
	} else if ( followingList_or_followersList === "following" ) {
		query_hash = "d04b0a864b4b54837c0d870b0e77e076";
	}

	let variables;
	if ( end_cursor ) {
		variables =
			`	{
					"id": "${id}",
					"include_reel": ${false},
					"fetch_mutual": ${false},
					"first": ${50},
					"after": ${end_cursor} 
				}
			`;	
	} else {
		variables =
			`	{
					"id": "${id}",
					"include_reel": ${false},
					"fetch_mutual": ${false},
					"first": ${50} 
				}
			`;		
	}

	xhr.open( 'get', `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables=${variables}`);
	xhr.onload = () => {
			if ( xhr.status === 200 ) {
				let items_list;
				if ( followingList_or_followersList === "followers" ) {
					items_list = items_list_followers;
				} else if ( followingList_or_followersList === "following" ) {
					items_list = items_list_following;
				}

				let response = xhr.response;
				if ( xhr.response.length > 0 ) {
					//console.log(`Fetching ${followingList_or_followersList} users.`);
					response = JSON.parse(xhr.response);
					let edge_type = response.data.user.edge_follow  || response.data.user.edge_followed_by;
					let users = edge_type.edges;
					let has_next_pagee = edge_type.page_info.has_next_page;
					remaining_page = has_next_pagee;
					
					for ( let i = 0; i < users.length; i++ ) {
						let user_payload_data = {"username": users[i].node.username, "full_name": users[i].node.full_name, "profile_pic_url": users[i].node.profile_pic_url, "id": users[i].node.id};
						push_users_list( user_payload_data, followingList_or_followersList );
					}
					if ( has_next_pagee === true ) {
						end_cursor = `"${edge_type.page_info.end_cursor}"`;
						setTimeout(()=>{
							get_user_info(followingList_or_followersList, time_ramdomizer("fast")/* *250 */);
						}, delay);
					} else {
						end_cursor = "";

						if ( remaining_page === false && items_list_followers.length === 0 ) {
							get_user_info("followers", time_ramdomizer("fast")/* *250 */);
							document.getElementsByClassName("Fetching_message")[0].innerHTML = "Getting FOLLOWERS USERS...";
						} else if ( remaining_page === false && items_list_followers.length > 0 ) {
							//console.log("Recovering unfollowers.");
							get_unfollowers();
						}
					}
				}
			}
	}
	xhr.send();
}

let unfollowers = 0;
const get_unfollowers = () => {
	if ( items_list_following.length !== 0 && items_list_followers.length !== 0 ) {
		for(let i = 0; i < items_list_following.length; i++) {
			for(let b = 0; b < items_list_followers.length; b++) {
				if ( items_list_following[i].username === items_list_followers[b].username  ) {
					unfollowers_list.splice(unfollowers_list.indexOf(items_list_following[i]), 1);
					//console.log(unfollowers_list.indexOf(unfollowers_list[i]))
					unfollowers = unfollowers_list.length;
				} else {
					unfollowers = unfollowers_list.length;
				}
			}
		}
	} else {
		unfollowers_list = items_list_following;
		unfollowers = unfollowers_list.length;	
	}

	//console.log(unfollowers_list);
	//console.log('Unfollowers gotten.');
	pull_unfollowers_items_list();
}

const pull_unfollowers_items_list = () => {
	delete_unfollowers_element("fetching_unfollowers_message");
	delete_unfollowers_element("unfollowers_msg_styles");	
	inject_unfollowers_modal(unfollowers);

	for ( let i = 0; i < unfollowers_list.length; i++ ) {
		if ( unfollowers_list[i].username.toLowerCase().split("")[0] === "a" ) {
			insert_unfollower_item(unfollowers_list[i].profile_pic_url, unfollowers_list[i].username, unfollowers_list[i].full_name, unfollowers_list[i].id, i);
		}
	}
}

const sort_unfollowers_items_list = ( letter ) => {
	let unfoll_users_container = document.getElementsByClassName("unfollowers_content")[0];
	unfoll_users_container.innerHTML = "";
	for ( let i = 0; i < unfollowers_list.length; i++ ) {
		if ( letter === "1" ) {
			if ( unfollowers_list[i].username.toLowerCase().split("")[0] === "1" ) {
				insert_unfollower_item(unfollowers_list[i].profile_pic_url, unfollowers_list[i].username, unfollowers_list[i].full_name, unfollowers_list[i].id, i);
			}
		}

		if ( letter === "1" ) {
			switch (  unfollowers_list[i].username.toLowerCase().split("")[0] ) {
				case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
					insert_unfollower_item(unfollowers_list[i].profile_pic_url, unfollowers_list[i].username, unfollowers_list[i].full_name, unfollowers_list[i].id, i);
					break;
			}
		} else if ( letter === "/_." ) {
			switch (  unfollowers_list[i].username.toLowerCase().split("")[0] ) {
				case "_": case "@": case ".":
					if ( unfollowers_list[i].username.toLowerCase().split("")[0] === "_" ) {
						insert_unfollower_item(unfollowers_list[i].profile_pic_url, unfollowers_list[i].username, unfollowers_list[i].full_name, unfollowers_list[i].id, i);
					}
					break;
			}			
		} else {
			if ( unfollowers_list[i].username.toLowerCase().split("")[0] === letter ) {
				insert_unfollower_item(unfollowers_list[i].profile_pic_url, unfollowers_list[i].username, unfollowers_list[i].full_name, unfollowers_list[i].id, i);
			}
		}
	}
}

const unfollow_user = ( user_id, el__name ) => {
	const xhr = new XMLHttpRequest();
	document.getElementsByName(el__name)[0].getElementsByTagName("button")[0].setAttribute("disabled", true);
	xhr.open( 'post', `https://www.instagram.com/web/friendships/${user_id}/unfollow/` );
	xhr.onload = () => {
		if ( xhr.status === 200 ) {
			(()=>{
				unfollowers_list.splice(el__name, 1);
				document.getElementsByName(el__name)[0].remove();
				document.getElementsByClassName("qty_unfollowers")[0].innerHTML = unfollowers_list.length;
			})();
		} else {
			alert("You can only unfollow 15 users each 5 minutes.");
			document.getElementsByName(el__name)[0].getElementsByTagName("button")[0].setAttribute("disabled", false);
		}
	}
	xhr.setRequestHeader("accept", "*/*");
	xhr.setRequestHeader("accept-language", "es-ES,es;q=0.9");
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("x-csrftoken", `${__initialData.data.config.csrf_token}`);
	xhr.setRequestHeader("x-ig-app-id", "936619743392459");
	xhr.setRequestHeader("x-instagram-ajax", "587b05e1c9a8");
	xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");

	xhr.send();
}

//get_user_info("following", 1);