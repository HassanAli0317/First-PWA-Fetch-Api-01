
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('../SW.js')
  .then(function(){
    console.log('SW registered')
  });  
}

let titleText = document.querySelector('#titleText');
let navText = document.querySelector('#navText');
let err = document.querySelector('#err');

const input = document.querySelector("#search");
const btn = document.querySelector("#btn");
const main = document.querySelector("#div");


window.addEventListener('load', event => {
    const default_value = 'HassanAli0317';
    myFollowers(default_value);
})
input.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        myFollowers(input.value);
        input.value = "";
    }
});
btn.addEventListener('click', e => {
    myFollowers(input.value);
    input.value = "";
})


async function myFollowers(val) {
    const res = await fetch(`https://api.github.com/users/${val}/followers`)
    const json = await res.json();
    console.log(json);

    if (!(json.message)) {
        titleText.innerHTML = `${val}`;
        navText.innerHTML = `${val}`;
        err.innerHTML = '';
    } else {
        main.innerHTML = '';
        err.innerHTML = `THIS ID (${val}) is Not Found on Git-Hub`
    }
    if (json.length === 0) {
        err.innerHTML = `THIS ID (${val}) No Followers please Enter another UserId`
    }

    main.innerHTML = json.map((v, i) => {

        return `
        <div class="card" style="width: 18rem; margin:10px;">
            <img class="card-img-top" src="${v.avatar_url}" alt="Card image cap">
            <div class="card-body" style="padding:10px;">
                <h6 class="card-title">${v.login}</h6>
                <p class="card-text">UserID: ${v.id}</p>
                <a href="${v.html_url}" target="_blank" class="btn btn-success btn-block">Goto Profile</a>
            </div>
        </div>
        `
    });
}
