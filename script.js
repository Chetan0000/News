const API_KEY = '18813068de1e40acb9877bdda680d857';
const url = ' https://gnews.io/api/v4/search?q=';


window.addEventListener('load',() => featchnews("indian"));


async function featchnews(query){
    const res = await fetch(`${url}${query}&lang=en&max=20&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    // console.log(data.articles);
} 

function bindData(articles){

    const cardscontainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card')
    
    cardscontainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.image) return;
        const card_clone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(card_clone,article);
        cardscontainer.appendChild(card_clone);

    });
}

function fillDataInCard(card_clone, article){
    const newsImg = card_clone.querySelector('#news-img');
    const newsTitle = card_clone.querySelector('#news-title');
    const newsAuthor = card_clone.querySelector('#news-source');
    const newsDesc = card_clone.querySelector('#news-desc');
    
    

    const date = new Date(article.publishedAt).toLocaleDateString('en-us',{
        timeZone:'Asia/Jakarta'
    });

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsAuthor.innerHTML = `${article.source.name} · ${date}`
    newsDesc.innerHTML = article.description;
card_clone.firstElementChild.addEventListener('click', ()=>{
    window.open(article.url,'_blank');
})

}



// /* nav item click 
let curSelectedNav = null;
function onNaveItemClick(id){
    const query = id;
    console.log(query); 
    




    featchnews(query);
    const navItem = document.getElementById('active');
    if(navItem==null) return;
    curSelectedNav?.classList.remove('active');

    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

/*  search button */

const searchButton = document.querySelector('.search-button');
const searchText = document.querySelector('.news-input');

searchButton.addEventListener('click', () =>{
    const query = searchText.value;
    if(!query) return;
    featchnews(query);
    console.log(query);
})