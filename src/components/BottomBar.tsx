import { View, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function BottomBar() {
  const navigation = useNavigation<any>();

  return (
    <View className="absolute bottom-0 left-0 right-0">
      <View className="bg-[#121215] px-6 py-5 flex-row items-center justify-between">
        <Pressable onPress={() => navigation.navigate("Wallpaper")} className="p-3">
          <Feather name="home" size={22} color="#9ca3af" />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Choose")} className="p-3">
          <Feather name="image" size={22} color="#9ca3af" />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Profile")} className="p-3">
          <Feather name="calendar" size={22} color="#9ca3af" />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Profile")}
          className="p-3 rounded-full bg-[#232840]"
        >
          <Ionicons name="settings-outline" size={22} color="#6784e4" />
        </Pressable>
      </View>
    </View>
  );
}
