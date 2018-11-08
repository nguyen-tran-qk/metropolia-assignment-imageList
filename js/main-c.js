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
// Make the above HTML by using DOM methods.
// Create elements with createElement()
// Add attributes with setAttribute()
// Add elements with appendChild
// When the above HTML is ready append it to the <ul> element

fetch('images.json')
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        for (let i = 0; i < jsonData.length; i++) {
            // create all nodes
            const li = document.createElement('li');
            const figure = document.createElement('figure');
            const anchor = document.createElement('a');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');
            const h3 = document.createElement('h3');

            // insert text to h3 node then append it inside figcaption
            h3.appendChild(document.createTextNode(jsonData[i].mediaTitle));
            figcaption.appendChild(h3);

            // set attribute href for anchor node, src for img node and append img inside anchor node
            anchor.setAttribute('href', 'img/original/' + jsonData[i].mediaUrl);
            img.setAttribute('src', 'img/thumbs/' + jsonData[i].mediaThumb);
            anchor.appendChild(img);
            
            // wrapping up everything
            figure.appendChild(anchor);
            figure.appendChild(figcaption);
            li.appendChild(figure);
            document.getElementsByTagName('ul')[0].appendChild(li);
        }
    });