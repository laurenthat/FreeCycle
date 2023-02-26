import { Button, Input } from "@rneui/themed";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { Alert, Keyboard, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useUser, useTag } from "../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainContext } from "../contexts/MainContext";
import { useFocusEffect } from "@react-navigation/native";
import { appId, uploadsUrl } from "../utils/variables";
import { Avatar, Card, Appbar, Menu } from "react-native-paper";
import { Video } from "expo-av";

const EditProfile = ({ navigation, route }) => {
   const { user } = route.params;
   const { getFilesByTag } = useTag();

   const [mediafile, setMediafile] = useState({});
   const [avatar, setAvatar] = useState("");
   const video = useRef(null);
   const [loading, setLoading] = useState(false);
   const { putUser } = useUser();
   const { postTag } = useTag();
   const { update, setUpdate } = useContext(MainContext);
   const {
      control,
      handleSubmit,
      formState: { errors },
      trigger,
      reset,
   } = useForm({
      defaultValues: { username: user.username, email: user.email },
      mode: "onChange",
   });

   const loadAvatar = async () => {
      try {
         const avatarArray = await getFilesByTag("avatar_" + user.user_id);
         setAvatar(avatarArray.pop().filename);
      } catch (error) {
         console.log("user avatar fetch failed", error.message);
      }
   };

   const modifyUser = async (data) => {
      // create form data and post it
      setLoading(true);
      console.log("data", data);
      try {
         const token = await AsyncStorage.getItem("userToken");
         const result = await putUser(data, token);

         Alert.alert("Success", result.message, [
            {
               text: "OK",
               onPress: () => {
                  setUpdate(update);

                  navigation.navigate("Profile");
               },
            },
         ]);
      } catch (error) {
         console.error("User profile modify failed", error);
      } finally {
         setLoading(false);
      }
   };
   useEffect(() => {
      loadAvatar();
   }, []);

   return (
      <ScrollView>
         <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
            <Card>
               <Avatar.Image source={{ uri: uploadsUrl + avatar }} size={120} />
               <Controller
                  control={control}
                  rules={{
                     required: {
                        value: true,
                        message: "is required",
                     },
                     minLength: {
                        value: 3,
                        message: "Title min length is 3 characters.",
                     },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <Input
                        placeholder="Username"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        errorMessage={errors.title && errors.title.message}
                     />
                  )}
                  name="username"
               />
               <Controller
                  control={control}
                  rules={{
                     minLength: {
                        value: 5,
                        message: "Description min length is 5 characters.",
                     },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <Input
                        placeholder="Email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        errorMessage={
                           errors.description && errors.description.message
                        }
                     />
                  )}
                  name="email"
               />
               <Button
                  loading={loading}
                  title="EditProfile"
                  onPress={handleSubmit(modifyUser)}
               />
            </Card>
         </TouchableOpacity>
      </ScrollView>
   );
};

EditProfile.propTypes = {
   navigation: PropTypes.object,
   route: PropTypes.object,
};

export default EditProfile;
