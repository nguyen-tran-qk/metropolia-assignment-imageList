// Question 1:
console.warn('Question 1:');
const berryElement = document.getElementById('berry');
console.log('HTML element: ', berryElement, '\ninnerHTML: ', berryElement.innerHTML);
berryElement.style.backgroundColor = 'red';

// Question 2:
console.warn('Question 2:');
const orangeElement = document.querySelector('[data-foodtype="squishy"]');
console.log('HTML element: ', orangeElement, '\ninnerHTML: ', orangeElement.innerHTML);
orangeElement.style.backgroundColor = 'orange';

// Question 3.1:
console.warn('Question 3.1:');
const liCollection = document.getElementsByTagName('li');
console.log('Collection of <li> element: ', liCollection);

// Question 3.2:
console.warn('Question 3.2:');
console.log('Name of the fruits using for loop:')
for (let i = 0; i < liCollection.length; i++) {
  const element = liCollection[i];
  console.log(element.innerHTML);  
  if (element.innerHTML === 'Pear') {
    element.style.backgroundColor = 'green';
  }
  element.style.width = '100px';
  element.style.listStyleType = 'none';
}

// Question 4.1:
console.warn('Question 4.1:');
const liNodeList = document.querySelectorAll('li');
console.log('Collection of all the <li> elements: ', liNodeList);
 
// Question 4.2:
console.warn('Question 4.2');
console.log('Name of the fruits using forEach:')
liNodeList.forEach(element => {
  console.log(element.innerHTML);
  element.style.border = '1px solid black';
});
