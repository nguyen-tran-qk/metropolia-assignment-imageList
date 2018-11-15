'use strict';

// HTML contains element 'message'. This is used to show the server's response
// Select it and save it as a variable/object

// make function 'upload' which
// - prevents the form from sending
// - writes 'Upload in progress...' into 'message' element
// - selects the file input field
// - makes FormData -object and adds the file selected byt the user into the object
// - send the file to the same url as in task a by using fetch -method
// - when file upload is complete, writes server response to 'message' element
// function ends

// make an event listener which calls upload function when the form is submitted

const upload = () => {
  // prepare uploading
  const message = document.querySelector('#message');
  message.innerHTML = 'Upload in progress...';

  // prepare upload data
  const input = document.querySelector('input[type="file"]');
  const formData = new FormData();
  formData.append('file', input.files[0]);
  const settings = {
    method: 'POST',
    body: formData
  };

  // upload
  fetch('/upload', settings).then(response => {
    return response.json();
  }).then(json => {
    if (json.code && json.code === 204) { // upload succeeded
      message.innerHTML = `File ${ json.data.fileName } has been uploaded.`;
      if (json.data.isImage) {
        message.innerHTML += '\nBecause you uploaded an image, you can view it below.'
        const img = document.querySelector('img');
        img.setAttribute('src', json.data.filePath);
      }
    } else { // upload failed
      message.innerHTML = 'Failed to upload file.';
    }
  });
};

document.addEventListener('submit', (event) => {
  event.preventDefault();
  upload();
});
