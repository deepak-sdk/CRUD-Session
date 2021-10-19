document.body.innerHTML = `
<div class="add-user">
<input class="add-user-name" type="text" placeholder="Enter the name">
<input class="add-user-image" type="url" placeholder="Paste the url">
<button onclick="adduser()">Add</button></div>
<section class="userlist"></section>`;

async function getallusers() {
  const data = await fetch("https://616d506937f997001745d992.mockapi.io/user/");
  const users = await data.json();
  console.log(users);

  const usercontainer = document.querySelector(".userlist");
  usercontainer.innerHTML = ""; // to erase the old user list
  users.forEach((data) => {
    // console.log(data)

    usercontainer.innerHTML += `
    <div class="profile-container mx-auto">
        <img class="user-pic" src=${data.avatar}></img>
      <div class="user-name">
        <h5 class="user-name">${data.name}</h5>
      </div>

      <div class="edit-delete-user">
        <button onclick="toggleuser(${data.id})">EDIT</button>
        <button onclick="deleteuser(${data.id})">DELETE</button>
      </div>

        <div class="edit-user-form edit-${data.id}">
          <input value="${data.name}" class="edit-${data.id}-user-name" type="text" placeholder="Enter the name">
          <input value="${data.avatar}" class="edit-${data.id}-user-image" type="url" placeholder="Paste the url">
          <button onclick="saveuser(${data.id})">SAVE</button>
        </div>
     

    </div>
    `;
  });
}

getallusers();

async function deleteuser(userId) {
  console.log("deleted", userId);
  const data = await fetch(
    "https://616d506937f997001745d992.mockapi.io/user/" + userId,
    { method: "DELETE" }
  );
  getallusers();
}

async function adduser() {
  var name = document.querySelector(".add-user-name").value;
  var avatar = document.querySelector(".add-user-image").value;
  console.log(avatar, name);

  //✳️ Steps to be followed to get POST method
  // 1.Method - Post
  // 2.Data - Body -  Stringify(JSON)
  // 3.Header - JSON data

  const data = await fetch(
    "https://616d506937f997001745d992.mockapi.io/user/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, avatar }),
    }
  );

  // Once add the user, refresh the user list
  // add user
  getallusers();

  // make the input empty once user is added

}

function toggleuser(userId) {
  console.log("editing");
  const editUserForm = document.querySelector(`.edit-${userId}`);
  console.log(editUserForm.style.display)
  editUserForm.style.display= editUserForm.style.display === "block" ? "none" : "block";

}


async function saveuser(userId){
  console.log("edited", userId)
  var name = document.querySelector(`.edit-${userId}-user-name`).value;
  var avatar = document.querySelector(`.edit-${userId}-user-image`).value;
  console.log(avatar, name);
  // Combination of PUT AND DELETE

  const data = await fetch(
    "https://616d506937f997001745d992.mockapi.io/user/" + userId,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name:name, avatar:avatar }),
    }
  );

  // Once add the user, refresh the user list
  // add user
  getallusers();
}

// C - Create - Post
// R - Read - GET - Default
// U - Update - PUT/PATCH
// D - Delete - DELETE

// Delete -> deleteuser -> fetch DELETE -> Refreshing
// Delete -> Refresh the user(old list + new list)
// delete old list and then add new list

// JSON - string - RESTAPI

// 🏡HomeWork
// Complete Save Function
// Add fontawesome icon