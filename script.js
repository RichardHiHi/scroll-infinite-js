const listPost = document.querySelector('.list-post');


let page = 0;
const limit = 3;



async function getPost() {

    let post = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    post = await post.json();

    return post;
}

async function init() {
    const posts = await getPost();
    console.log(posts[0].body)

    posts.forEach(post => {
        let postElement = document.createElement('li');
        postElement.classList.add('post');
        postElement.innerHTML = `<div class="post-number"><span>${post.id}</span></div><h2 class="post-title">
        ${post.title}</h2><p class="post-title">${post.body}</p>`;
        listPost.appendChild(postElement);
    })
}

init()