import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { useTag } from "../hooks/ApiHooks";
import TopBarNavigator from "../navigators/TopBarNavigator";
import { uploadsUrl } from "../utils/variables";
import { Avatar, Card, Appbar, Menu } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Modify from "./Modify";

const Profile = ({ navigation }) => {
   const { getFilesByTag } = useTag();
   const { setIsLoggedIn, user, setUser } = useContext(MainContext);
   const [avatar, setAvatar] = useState("");
   const windowWidth = Dimensions.get("window").width;
   const [visible, setVisible] = React.useState(false);

   const loadAvatar = async () => {
      try {
         const avatarArray = await getFilesByTag("avatar_" + user.user_id);
         setAvatar(avatarArray.pop().filename);
      } catch (error) {
         console.log("user avatar fetch failed", error.message);
      }
   };

   const openMenu = () => setVisible(true);

   const closeMenu = () => setVisible(false);

   useEffect(() => {
      loadAvatar();
   }, []);

   return (
      <>
         <Appbar.Header>
            <Appbar.Content title="Profile" />
            <Appbar.Action icon="dots-vertical" onPress={openMenu} />
         </Appbar.Header>
         <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={{ x: windowWidth, y: 100 }}
         >
            <Menu.Item
               onPress={() => {
                  navigation.navigate("EditProfile", { user: user });
                  closeMenu();
               }}
               title="Edit Profile"
            />
            <Menu.Item
               onPress={async () => {
                  console.log("Loggin out!");
                  setUser({});
                  setIsLoggedIn(false);
                  try {
                     await AsyncStorage.clear();
                  } catch (error) {
                     console.error("clearing asyncstoreage failed", error);
                  }
               }}
               title="Log out"
            />
         </Menu>
         <Card
            mode="contained"
            style={{
               display: "flex",
               alignItems: "center",
               flexDirection: "row",
               justifyContent: "center",
               backgroundColor: "white",
            }}
         >
            <Avatar.Image source={{ uri: uploadsUrl + avatar }} size={120} />
            <Card.Title
               title={user.username}
               titleVariant="titleLarge"
               style={{
                  alignSelf: "center",
                  flexDirection: "column",
               }}
            />
         </Card>
         <TopBarNavigator />
      </>
   );
};

Profile.propTypes = {
   navigation: PropTypes.object,
};

export default Profile;
