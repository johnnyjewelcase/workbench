import React, { useEffect, useState } from "react";
import API from "../utils/API";
import CardContainer from "../components/CardContainer";
import Row from "../components/Row";
import UserContext from "../utils/UserContext";

function Gallery() {
  const [userState, setUserState] = useState({
    user: {},
    users: [],
    userIndex: 0
  });

  // When the component mounts, a call will be made to get random users.
  useEffect(() => {
    loadUsers();
  }, []);

  function nextUser(userIndex) {
    // Ensure that the user index stays within our range of users
    if (userState.userIndex >= userState.users.length) {
      userIndex = 0;
    }
    setUserState({ user: userState.users[userIndex], userIndex: userIndex });
  }

  function previousUser(userIndex) {
    // Ensure that the user index stays within our range of users
    if (userIndex < 0) {
      userIndex = userState.users.length - 1;
    }
    setUserState({ user: userState.users[userIndex], userIndex: userIndex });
  }

  function handleBtnClick(event) {
    // Get the title of the clicked button
    const btnName = event.target.getAttribute("data-value");
    if (btnName === "next") {
      const newUserIndex = userState.userIndex + 1;
      nextUser(newUserIndex);
    } else {
      const newUserIndex = userState.userIndex - 1;
      previousUser(newUserIndex);
    }
  }

  function loadUsers() {
    API.getLanguagesList()
      .then(languages => {
        API.getUsersByLanguage(languages[0]).then(users => {
          setUserState({ user: users[0], users: users });
        });
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h1 className="text-center">Welcome to LinkedUp</h1>
      <h3 className="text-center">Click on the arrows to browse users</h3>
      <Row>
        <UserContext.Provider
          value={{ user: userState.user, onClick: handleBtnClick }}
        >
          <CardContainer />
        </UserContext.Provider>
      </Row>
    </div>
  );
}

export default Gallery;
