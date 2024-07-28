document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;

    fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, content })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadPosts();
        }
    });
});

function loadPosts() {
    fetch('/posts')
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts');
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `<strong>${post.username}</strong><p>${post.content}</p>`;
                postsContainer.appendChild(postElement);
            });
        });
}

loadPosts();
