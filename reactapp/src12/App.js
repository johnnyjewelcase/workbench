import React from "react";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import FriendCard from "./components/FriendCard";
// import SpongeBobCard from "./components/SpongeBobCard";
// import SquidwardCard from "./components/SquidwardCard";
// import MrKrabsCard from "./components/MrKrabsCard";

function App() {
  return (
    <Wrapper>
      <Title>Friends List</Title>
      {console.log(friends.length)}
      {/* {for (i=0; i< friends.length; i++) { */}
      <FriendCard
        name={friends[0].name}
        occupation={friends[0].occupation}
        image={friends[0].image}
        location={friends[0].location}
      />
      <FriendCard
        name={friends[1].name}
        occupation={friends[1].occupation}
        image={friends[1].image}
        location={friends[1].location}
      />
      <FriendCard
        name={friends[2].name}
        occupation={friends[2].occupation}
        image={friends[2].image}
        location={friends[2].location}
      />
    </Wrapper>
  );
}

export default App;
