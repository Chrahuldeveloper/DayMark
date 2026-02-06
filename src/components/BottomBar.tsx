import { View, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BottomBar() {

  return (
    <View className="absolute bottom-4 w-full items-center">
      <View className="bg-[#121215] px-6 py-4 rounded-full flex-row items-center justify-between w-[90%]">
        
        <Pressable className="p-3">
          <Feather name="home" size={22} color="#9ca3af" />
        </Pressable>

        <Pressable className="p-3">
          <Feather name="image" size={22} color="#9ca3af" />
        </Pressable>

        {/* <Pressable className="p-3">
          <Feather name="calendar" size={22} color="#9ca3af" />
        </Pressable> */}

        <Pressable className="p-3 rounded-full bg-[#232840]">
          <Ionicons name="settings-outline" size={22} color="#6784e4" />
        </Pressable>

      </View>
    </View>
  );
}
