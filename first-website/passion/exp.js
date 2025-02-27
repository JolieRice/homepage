document.addEventListener("DOMContentLoaded", function () {
  const createPostModal = document.getElementById("createPostModal");
  const postForm = document.getElementById("postForm");
  const postSubmitBtn = document.getElementById("postSubmitBtn");
  const postContainer = document.querySelector(".post-container");
  const closeModal = document.getElementById("closeModal");

  // Show modal when "Create Post" button is clicked
  document
    .getElementById("createPostBtn")
    .addEventListener("click", function () {
      createPostModal.style.display = "flex";
    });

  // Close modal
  closeModal.addEventListener("click", function () {
    createPostModal.style.display = "none";
  });

  // Handle form submission
  postForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.querySelector(".title").value;
    const category = document.querySelector(".category1").value;
    const description = document.querySelector(".postDescription").value;

    // Get image and audio files
    const postImage = document.getElementById("postImage").files[0];
    const postAudio = document.getElementById("postAudio").files[0];

    // Get current date
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
      "default",
      { month: "short" }
    )} ${currentDate.getFullYear()}`;

    // Create file URLs if files are uploaded
    const imageUrl = postImage ? URL.createObjectURL(postImage) : null;
    const audioUrl = postAudio ? URL.createObjectURL(postAudio) : null;

    // Prepare post data
    const postData = {
      category: category,
      title: title,
      description: description,
      imageUrl: imageUrl,
      audioUrl: audioUrl,
      date: formattedDate,
    };

    // Send post data to backend
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        loadPosts(); // Reload posts after successful creation
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  });

  // Load posts from backend
  function loadPosts() {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => {
        postContainer.innerHTML = ""; // Clear existing posts

        data.forEach((post) => {
          const newPost = document.createElement("div");
          newPost.className = "post-box";
          newPost.innerHTML = `
                <h1 class="post-title">${post.title}</h1>
                <h2 class="category">${post.category}</h2>
                <span class="post-date">${post.date}</span>
                <p class="post-description">${post.description}</p>
                ${
                  post.imageUrl
                    ? `<img src="${post.imageUrl}" alt="Post Image" class="post-image">`
                    : ""
                }
                ${
                  post.audioUrl
                    ? `<audio controls><source src="${post.audioUrl}" type="audio/mpeg"></audio>`
                    : ""
                }
                <button class="delete-post" data-id="${post.id}">Delete</button>
              `;
          postContainer.appendChild(newPost);
        });
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
      });
  }

  // Handle post deletion
  postContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-post")) {
      const postIdToDelete = event.target.getAttribute("data-id");

      fetch(`http://localhost:3000/posts/${postIdToDelete}`, {
        method: "DELETE",
      })
        .then(() => {
          const postToDelete = event.target.closest(".post-box");
          postContainer.removeChild(postToDelete);
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  });

  // Load posts when the page loads
  loadPosts();
});
