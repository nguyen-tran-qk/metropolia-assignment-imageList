// Create function 'showImages' which
// loads images.json which has links to images as an array.

// create a loop which builds the following HTML from every image in the array: 
/*
<li>
    <figure>
        <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
        <figcaption>
            <h3>Title</h3>
        </figcaption>
    </figure>
</li>
*/
// After the loop print the HTML into <ul> element using innerHTML.

fetch('images.json')
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        for (let i = 0; i < jsonData.length; i++) {
            document.getElementsByTagName('ul')[0].innerHTML += '<li><figure><a href="img/original/' + jsonData[i].mediaUrl 
                + '"><img src="img/thumbs/' + jsonData[i].mediaThumb + '"></a><figcaption><h3>' + jsonData[i].mediaTitle + '</h3></figcaption></figure></li>';
        }
    });