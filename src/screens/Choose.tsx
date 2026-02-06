import {
  Image,
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
  ImageBackground
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomBar from "@/components/BottomBar";
import { useWallpaper } from "../context/WallpaperContext";
import { useNavigation } from "@react-navigation/native";

export default function Choose() {
  const { setWallpaper } = useWallpaper();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const images = [
    "https://images.pexels.com/photos/19786549/pexels-photo-19786549.jpeg",
    "https://images.pexels.com/photos/11703240/pexels-photo-11703240.jpeg",
    "https://images.pexels.com/photos/35901130/pexels-photo-35901130.jpeg",
    "https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg",
    "https://images.pexels.com/photos/35876738/pexels-photo-35876738.jpeg",
    "https://images.pexels.com/photos/5566303/pexels-photo-5566303.jpeg"
  ];

  return (
    <SafeAreaView>
      <View className="bg-black w-screen h-full">
        <View className="p-4">
          <Text className="text-white text-2xl font-semibold">
            Choose Photo
          </Text>
          <Text className="text-gray-300 pt-3 text-sm">
            Select your wallpaper
          </Text>
        </View>

        <ScrollView>
          <View className="flex flex-wrap flex-row p-2 gap-3 justify-center items-center">
            {images.map((img, id) => (
              <Pressable key={id} onPress={() => setSelectedImage(img)}>
                <Image
                  source={{ uri: img }}
                  className="w-44 h-52 rounded-xl"
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <Modal visible={!!selectedImage} transparent animationType="fade">
          {selectedImage && (
            <ImageBackground
              source={{ uri: selectedImage }}
              className="flex-1 justify-center items-center"
              blurRadius={8}
            >
              <View className="absolute inset-0 bg-black/60" />

              <Pressable
                onPress={() => setSelectedImage(null)}
                className="absolute top-10 right-6 bg-black/70 w-10 h-10 rounded-full items-center justify-center"
              >
                <Text className="text-white text-lg">✕</Text>
              </Pressable>

              <Image
                source={{ uri: selectedImage }}
                className="w-64 h-96 rounded-2xl"
                resizeMode="cover"
              />

              <Pressable
                onPress={() => {
                  setWallpaper(selectedImage);
                  setSelectedImage(null);
                  navigation.navigate("Wallpaper");
                }}
                className="bg-[#6784e4] w-40 mt-6 p-4 rounded-full"
              >
                <Text className="text-white text-center text-sm font-semibold">
                  ✓ Use This Photo
                </Text>
              </Pressable>
            </ImageBackground>
          )}
        </Modal>

        <BottomBar page="Choose"/>
      </View>
    </SafeAreaView>
  );
}
