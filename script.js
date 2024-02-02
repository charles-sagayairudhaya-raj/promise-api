// Function to fetch data using a promise
function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Function to display user details on the webpage
function displayUserDetails(users) {
    const userList = document.getElementById('userList');
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${user.name}, Email: ${user.email}`;
        userList.appendChild(listItem);
    });
}

// Function to display latest posts on the webpage
function displayLatestPosts(posts) {
    const postList = document.getElementById('postList');
    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${post.title}, Body: ${post.body}`;
        postList.appendChild(listItem);
    });
}

// Function to display random photos on the webpage
function displayRandomPhotos(photos) {
    const photoGallery = document.getElementById('photoGallery');
    photos.forEach(photo => {
        const image = document.createElement('img');
        image.src = photo.url;
        photoGallery.appendChild(image);
    });
}

// Fetch user details, latest posts, and random photos using promises
Promise.all([
    fetchData('https://jsonplaceholder.typicode.com/users'),
    fetchData('https://jsonplaceholder.typicode.com/posts'),
    fetchData('https://jsonplaceholder.typicode.com/photos?_limit=3')
])
    .then(([users, posts, photos]) => {
        displayUserDetails(users);
        displayLatestPosts(posts);
        displayRandomPhotos(photos);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
