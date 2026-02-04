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

export default function Choose() {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        "https://images.pexels.com/photos/19786549/pexels-photo-19786549.jpeg",
        "https://images.pexels.com/photos/19786549/pexels-photo-19786549.jpeg",
        "https://images.pexels.com/photos/19786549/pexels-photo-19786549.jpeg",
        "https://images.pexels.com/photos/19786549/pexels-photo-19786549.jpeg",
        "https://images.pexels.com/photos/19786549/pexels-photo-19786549.jpeg",
        "https://images.pexels.com/photos/35876738/pexels-photo-35876738.jpeg",
    ];

    return (
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
                    {images.map((i, id) => (
                        <Pressable key={id} onPress={() => setSelectedImage(i)}>
                            <Image
                                source={{ uri: i }}
                                className="w-44 h-52 rounded-xl"
                                resizeMode="cover"
                            />
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            <Modal visible={!!selectedImage} transparent animationType="fade">
                <ImageBackground
                    source={{ uri: selectedImage } as any}
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
                        source={{ uri: selectedImage } as any}
                        className="w-64 h-96 rounded-2xl"
                        resizeMode="cover"
                    />
          <Pressable className="bg-[#6784e4] w-40 mx-auto mt-6 p-4 rounded-full ">
            <Text className="text-white text-center text-sm font-semibold ">
              ✓  Use This Photo
            </Text>
          </Pressable>
                </ImageBackground>
            </Modal>
        </View>
    );
}
