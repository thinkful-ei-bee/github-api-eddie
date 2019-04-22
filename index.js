'use strict';
const store = {
  results: []
};

function toElement(item){
  const {name, url} = item;
  return `<li><a href="${url}">${name}</a></li>`;
}

function storeUserResults(results){
  const resArray = [];
  results.forEach(repo=>{
    resArray.push({
      name: repo.name,
      url: repo.url
    });
  });
  return resArray;
}

function apiCall(username){
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then(res =>{
      if (res.ok){
        return res.json();
      }
      throw new Error (res.statusText);
    });
    
}

function render(){
  const htmlString = store.results.map(toElement).join('');
  $('#results').html(htmlString);
}

function handleSubmit(){
  $('#search-form').on('submit',e=>{
    e.preventDefault();
    const username = $('#username').val();
    apiCall(username)
      .then(data=>{
        store.results = storeUserResults(data);
        render();
      })
      .catch(err=>{
        console.log(`Something went wrong: ${err}`);
      });
  });
}

function main(){
  handleSubmit();
  render();
}

$(main);