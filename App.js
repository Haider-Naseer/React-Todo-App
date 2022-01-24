import React from "react";
import TodoList from "./TodoList";
import AppLoading from "expo-app-loading"; // expo install expo-app-loading
import { useFonts } from "expo-font";
export default function App() {
  let [fontsLoaded] = useFonts({
    "montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-semiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf")
  });

  if (!fontsLoaded) {
    return <AppLoading error={(error) => console.log("Error: ", error)} />;
  } else {
    return (
      <>
        <TodoList />
      </>
    );
  }
}
