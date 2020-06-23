import React, { Component } from "react";
import HomeScreen from "./Home.js";
import SideBar from "./SideMenu.js";
import { createDrawerNavigator } from "@react-navigation/drawer";
const HomeScreenRouter = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },

  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;