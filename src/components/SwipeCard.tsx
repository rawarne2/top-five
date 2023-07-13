import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Swiper from "react-native-deck-swiper";

const NoMoreCards = () => {
  console.log("No more cards");
  return (
    <View style={styles.noMoreCards}>
      <Text>No more cards</Text>
    </View>
  );
};

const Card = ({ cardData }) => (
  <View style={styles.card}>
    <Image style={styles.thumbnail} source={{ uri: cardData?.image }} />
    <Text style={styles.text}>{cardData?.name}</Text>
  </View>
);

export function SwipeCard() {
  const userCards = [
    {
      name: "name1",
      image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif",
      age: 28,
    },
    {
      name: "name2",
      image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif",
      age: 18,
    },
    {
      name: "name3",
      image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif",
      age: 25,
    },
    {
      name: "name4",
      image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif",
      age: 35,
    },
    {
      name: "name5",
      image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif",
      age: 45,
    },
    {
      name: "name6",
      image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif",
      age: 50,
    },
    {
      name: "name7",
      image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif",
      age: 19,
    },
    {
      name: "name8",
      image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif",
      age: 26,
    },
    {
      name: "name9",
      image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif",
      age: 22,
    },
    {
      name: "name10",
      image: "https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif",
      age: 29,
    },
  ];
  const [cards, setCards] = useState(userCards);

  const onSwiped = (index) => {
    setCards((prevCards) => prevCards.slice(1));
  };
  const handleYup = () => {
    console.log("yup");
  };
  const handleNope = () => {
    console.log("nope");
  };

  return (
    <View>
      <Swiper
        cards={cards}
        renderCard={(cardData) => <Card cardData={cardData} />}
        stackSize={10}
        onSwiped={onSwiped}
        onSwipedAll={() => <NoMoreCards />}
        onSwipedRight={handleYup}
        onSwipedLeft={handleNope}
        verticalSwipe={false}
        cardIndex={0}
        horizontalThreshold={10}
        key={cards.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 1,
    padding: 20,
    zIndex: 1,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
