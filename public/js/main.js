'use strict';
const getPic = ()=>{
  fetch('/node/grabpic/')
  .then((res)=>{return res.json();})
  .then(json => {
    generateContent(json);
  });
};

getPic();

const srchform = document.querySelector('#srchform');
srchform.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const searchValue = ev.target.elements['search'].value;
  const type = ev.target.elements['column'].value;
  fetch('/node/search/', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
    }),
    body: `search=${searchValue}&type=${type}` // <-- Post parameters
  })
  .then((res) => res.json())
  .then( json => {
    console.log(json);
    generateContent(json);
  })
});

const upform = document.querySelector('#mediaform');
upform.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const fd = new FormData(upform);
  const settings = {
    method: 'post',
    body: fd,
  };
  fetch('/node/upload/', settings)
  .then((res) => {
    getPic();
  });
});

const generateContent = (json)=>{
  console.log(json);
  const main = document.querySelector('main');
  main.innerHTML = '';
  for (let i = 0; i<json.length;i++){
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('src',`./img/original/${json[i].original}`);
    div.appendChild(img);

    const rmButton = document.createElement('button');
    rmButton.setAttribute('type', 'submit');
    rmButton.innerText = 'remove';
    rmButton.style.backgroundColor = 'red';
    rmButton.style.color = 'wheat';
    rmButton.className = 'rmButton';
    rmButton.id = json[i].id;

    const frm = document.createElement('form');
    frm.id = json[i].id;
    frm.className = 'rmForm';
    frm.enctype = "multipart/form-data";
    frm.action = '/x/';
    frm.method = 'post';
    frm.appendChild(rmButton);

    //-----------------------------------------------------
    //form for modifying data
    const modfrm = document.createElement('form');
    modfrm.id = '-'+json[i].id;
    modfrm.className = 'modFrm';
    modfrm.enctype = "multipart/form-data";
    modfrm.action = '/x/';
    modfrm.method = 'post';

    const category = document.createElement('input');
    category.setAttribute('type', 'text');
    category.name = 'category';
    category.placeholder = 'category';

    const title = document.createElement('input');
    title.setAttribute('type', 'text');
    title.name = 'title';
    title.placeholder = 'title';

    const detail = document.createElement('input');
    detail.setAttribute('type', 'text');
    detail.name = 'detail';
    detail.placeholder = 'detail';

    const sbmtButton = document.createElement('button');
    sbmtButton.innerText = 'update';
    sbmtButton.style.backgroundColor = 'blue';
    sbmtButton.style.color = 'white';
    sbmtButton.setAttribute('type','submit');

    modfrm.appendChild(category);
    modfrm.appendChild(title);
    modfrm.appendChild(detail);
    modfrm.appendChild(sbmtButton);

    div.appendChild(modfrm);
    div.appendChild(frm);
    main.appendChild(div);
  }
  populateRM();
  populateMD();
};

//fetch
const populateRM = ()=>{
  const rmList = document.querySelectorAll('.rmForm');

  for(let i = 0; i<rmList.length;i++){
    rmList[i].addEventListener('submit', (ev)=>{
      ev.preventDefault();
      console.log(ev.target.id);
      const data = new FormData(ev.target);
      data.append('çontent_id', ev.target.id);
      console.log(data);
      fetch('/node/remove/', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
        body: `content_id=${ev.target.id}` // <-- Post parameters
      })
      .then(res => {
        getPic();})
    });
  }
};

const populateMD = ()=>{
  const rmList = document.querySelectorAll('.modFrm');

  for(let i = 0; i<rmList.length;i++){
    rmList[i].addEventListener('submit', (ev)=>{
      ev.preventDefault();
      console.log(ev.target.id.substring(1));
      const ctgy = ev.target.elements['category'].value;
      const ttl = ev.target.elements['title'].value;
      const dtl = ev.target.elements['detail'].value;
      fetch('/node/update/', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
        body: `content_id=${ev.target.id.substring(1)}&ctgy=${ctgy}&ttl=${ttl}&dtl=${dtl}` // <-- Post parameters
      })
      .then(res => {
        getPic();})
    });
  }
};