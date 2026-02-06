import { View, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface BottomBarProps {
  page: "Wallpaper" | "Choose" | "Calendar" | "Profile";
}

export default function BottomBar({ page }: BottomBarProps) {
  const navigation = useNavigation<any>();

  const isActive = (p: string) => page === p;

  const iconColor = (p: string) =>
    isActive(p) ? "#6784e4" : "#9ca3af";

  const bgStyle = (p: string) =>
    isActive(p) ? "bg-[#232840]" : "";

  return (
    <View className="absolute bottom-0 left-0 right-0">
      <View className="bg-[#121215] px-6 py-5 flex-row items-center justify-between">
        <Pressable
          onPress={() => navigation.navigate("Wallpaper")}
          className={`p-3 rounded-full ${bgStyle("Wallpaper")}`}
        >
          <Feather name="home" size={18} color={iconColor("Wallpaper")} />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Choose")}
          className={`p-3 rounded-full ${bgStyle("Choose")}`}
        >
          <Feather name="image" size={18} color={iconColor("Choose")} />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Calendar")}
          className={`p-3 rounded-full ${bgStyle("Calendar")}`}
        >
          <Feather name="calendar" size={18} color={iconColor("Calendar")} />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Profile")}
          className={`p-3 rounded-full ${bgStyle("Profile")}`}
        >
          <Ionicons
            name="settings-outline"
            size={18}
            color={iconColor("Profile")}
          />
        </Pressable>
      </View>
    </View>
  );
}
