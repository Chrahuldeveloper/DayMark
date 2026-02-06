import { View, Text, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

import { useWallpaper } from "../context/WallpaperContext";
import { useProgressStyle } from "../context/ProgressStyleContext";

interface TimeLine {
  year: number;
  day: string;
  month: string;
  date: number;
}

const SIZE = 208;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Wallpaper() {
  const { wallpaper } = useWallpaper();
  const { progress } = useProgressStyle();

  const [timeLine, settimeLine] = useState<TimeLine>({
    year: 0,
    day: "",
    month: "",
    date: 0,
  });

  const percent = 10; 

  const strokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;

  const getTimeLine = () => {
    const months = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    const weeks = [
      "Sunday","Monday","Tuesday","Wednesday",
      "Thursday","Friday","Saturday"
    ];

    const date = new Date();

    settimeLine({
      year: date.getFullYear(),
      day: weeks[date.getDay()],
      month: months[date.getMonth()],
      date: date.getDate(),
    });
  };

  useEffect(() => {
    getTimeLine();
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        source={{ uri: wallpaper as any }}
        className="w-screen h-screen"
        resizeMode="cover"
        blurRadius={2}
      >
        <View className="flex-1 bg-black/60">

          <View className="mt-24 items-center">
            <Text className="text-white text-2xl font-semibold">
              {timeLine.year}
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              {timeLine.day}, {timeLine.month} {timeLine.date}
            </Text>
          </View>

          <View className={`${progress.Ring ? "hidden" : ""} mt-16 items-center`}>
            <Text className="text-white text-[96px] font-light">37</Text>
            <Text className="text-gray-400 text-sm mt-2">
              days into 2026
            </Text>
          </View>

          {progress.Fade ? (
            <View className="flex-row justify-center gap-2 mt-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <View
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < 2 ? "bg-blue-500" : "bg-gray-700"
                  }`}
                />
              ))}
            </View>
          ) : progress.Ring ? (
            <View className="flex-row justify-center mt-10">
              <View className="items-center justify-center w-52 h-52">

                <Svg width={SIZE} height={SIZE}>
                  <Circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    stroke="#374151"
                    strokeWidth={STROKE}
                    fill="none"
                  />

                  <Circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    stroke="#60a5fa"
                    strokeWidth={STROKE}
                    fill="none"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${SIZE / 2}, ${SIZE / 2}`}
                  />
                </Svg>

                <View className="absolute w-40 h-40 rounded-full bg-black/60 items-center justify-center">
                  <Text className="text-white text-4xl font-semibold">
                    {percent}%
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    complete
                  </Text>
                </View>

              </View>
            </View>
          ) : progress.Bar ? (
            <View className="flex-row justify-center mt-6 px-10">
              <View className="w-full">
                <View className="h-2 rounded-full bg-gray-700 overflow-hidden">
                  <View
                    className="h-full rounded-full bg-[#6784e4]"
                    style={{ width: "10%" }}
                  />
                </View>

                <View className="flex-row justify-between mt-2">
                  {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => (
                    <Text
                      key={i}
                      className={`text-[10px] font-semibold ${
                        i < 2 ? "text-blue-400" : "text-gray-600"
                      }`}
                    >
                      {m}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ) : null}

          <Text
            className={`text-gray-500 text-xs text-center mt-5 ${
              progress.Ring ? "hidden" : ""
            }`}
          >
            {percent}% complete
          </Text>

          <View className="flex-row gap-4 justify-center mt-12">
            <View className="px-4 py-2 rounded-full border bg-black/50 border-gray-800">
              <Text className="text-blue-400 text-sm font-semibold">
                37 days passed
              </Text>
            </View>

            <View className="px-4 py-2 rounded-full border bg-black/50 border-gray-800">
              <Text className="text-blue-400 text-sm font-semibold">
                328 days left
              </Text>
            </View>
          </View>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
