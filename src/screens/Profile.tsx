import { Text, View, Switch, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomBar from "@/components/BottomBar";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const [reminders, setReminders] = useState(true);
  const [progressStyle, setProgressStyle] = useState("Ring");

  return (
    <SafeAreaView>
      <View className="bg-[#09090b] w-screen h-full">
        <View className="p-6">
          <Text className="text-white text-2xl font-semibold">Settings</Text>
          <Text className="text-gray-200 pt-3 text-sm">
            Customize your experience
          </Text>

          <Text className="text-slate-400 mt-6 mb-3">Appearance</Text>

          <View className="bg-[#161617] rounded-2xl p-5 gap-5">

            <View>
              <View className="flex-row gap-4 items-start mb-4">
                <Ionicons name="ellipse-outline" size={24} color="#6784e4" />
                <View>
                  <Text className="text-white text-lg font-semibold">
                    Progress Style
                  </Text>
                  <Text className="text-slate-400 text-sm mt-1">
                    Choose how to display progress
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-3">
                {["Ring", "Bar", "Fade"].map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => setProgressStyle(item)}
                    className={`px-5 py-2 rounded-full ${progressStyle === item
                        ? "bg-[#6784e4]"
                        : "bg-[#212123]"
                      }`}
                  >
                    <Text
                      className={`text-sm font-medium ${progressStyle === item
                          ? "text-white"
                          : "text-slate-400"
                        }`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          <Text className="text-slate-400 mt-8 mb-3">Notifications</Text>

          <View className="bg-[#161617] rounded-2xl p-5">
            <View className="flex-row items-center justify-between">
              <View className="flex-row gap-4 items-start">
                <Feather name="bell" size={24} color="#6784e4" />
                <View>
                  <Text className="text-white text-lg font-semibold">
                    Daily Reminders
                  </Text>
                  <Text className="text-slate-400 text-sm mt-1">
                    Get notified each morning
                  </Text>
                </View>
              </View>

              <Switch
                value={reminders}
                onValueChange={setReminders}
                trackColor={{ false: "#2a2a2c", true: "#6784e4" }}
                thumbColor="#ffffff"
              />
            </View>
          </View>


          <Text className="text-slate-400 mt-8 mb-5">About</Text>

          <View className="bg-[#161617] rounded-2xl p-5">
            <View className="flex-row items-center justify-between">
              <View className="flex-row gap-4 items-start">
                <AntDesign name="exclamation-circle" size={24} color="#6784e4" />
                <View>
                  <Text className="text-white text-lg font-semibold">
                    About
                  </Text>
                  <Text className="text-slate-400 text-sm mt-1">
                    Version 1.0.0
                  </Text>
                </View>
              </View>
              <AntDesign name="arrow-right" size={19} color="#6784e4" />
            </View>
          </View>

        </View>
      <BottomBar page="Profile"/>
      </View>
    </SafeAreaView>
  );
}
