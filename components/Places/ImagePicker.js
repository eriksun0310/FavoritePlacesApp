import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Button, Image, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const ImagePicker = ({ onTakeImage }) => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  //檢查是否有權限使用相機
  const verifyPermissions = async () => {
    //詢問user 是否要開啟相機權限
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      // 相機權限的結果(Yes、No)
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    //沒有相機的權限
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant camera permission to use this app."
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    //當前的相機權限狀態
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5, // 確保不會得到超大的圖像
    });
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  };

  let imagePreview = <Text>No image taken yet.</Text>;
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
