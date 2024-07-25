import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {
  // const onCreatePlaceHandler = async (place) => {
  //   console.log(111111)
  //   await insertPlace(place);
  //   console.log(222222)
  //   navigation.navigate("AllPlaces", {
  //     place: place,
  //   });
  // };

  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
