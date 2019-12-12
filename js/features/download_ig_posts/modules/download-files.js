const file_to_blob = (blob, filename, extension) => {

  let link = document.createElement('a');

  link.download = `${filename}.${extension}`;
  link.href = URL.createObjectURL(blob);
  link.click();

  URL.revokeObjectURL(link.href);   
}

const fetch_image = (url_post, filename, extension, completed_loaded_callback) => {
    let xhr = new XMLHttpRequest();
    let url = url_post;
    xhr.open('GET', url);
    xhr.responseType = "blob";
    xhr.onload = () => {
      file_to_blob(xhr.response, filename, extension);
      /*ADDED TO PLAY SOUND FROM IG DOWNLOAD*/play_sound(`${chrome_extension_uri+"samples/file_downloaded.m4a"}`, 'downloaded_file'); 
      if ( completed_loaded_callback ) {
        eval(completed_loaded_callback);
      }
    }
    xhr.send();
}

const download_file = (url, filename, extension, completed_loaded_callback) => {       
    return fetch_image(url, filename, extension, completed_loaded_callback);
}