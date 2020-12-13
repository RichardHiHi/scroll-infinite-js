const listPost = document.querySelector('.list-post');
const circle = document.querySelector('.circle');
const filter = document.querySelector('.filter');


let page = 1;
const limit = 5;

function filterword(e) {

    const word = e.target.value;
    const posts = document.querySelectorAll('.post')

    let idFliter = 1;

    posts.forEach((post) => {
        const title = post.querySelector('.post-title').innerHTML;
        const body = post.querySelector('.post-body').innerHTML;
        if (title.indexOf(word) > -1 || body.indexOf(word) > -1) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    })


}

async function getPost() {

    let post = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    post = await post.json();

    return post;
}

async function init() {
    const posts = await getPost();

    posts.forEach(post => {
        let postElement = document.createElement('li');
        postElement.classList.add('post');
        postElement.innerHTML = `<div class="post-number"><span>${post.id}</span></div><h2 class="post-title">
        ${post.title}</h2><p class="post-body">${post.body}</p>`;
        listPost.appendChild(postElement);
    })
}

function showLoader() {
    circle.classList.add('show');
    setTimeout(function() {
        setTimeout(function() {
            page++;
            console.log(page)

            init();
        }, 1000)
        circle.classList.remove('show');
    }, 2000)
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
        showLoader();
    }
})

filter.addEventListener('input', filterword)

init()