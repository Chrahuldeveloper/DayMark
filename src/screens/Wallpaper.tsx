import { View, Text, ImageBackground } from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

type TodoType = {
  id: string;
  text: string;
  completed: boolean;
};





export default function Wallpaper() {
  const viewRef = useRef(null);
  const [currentWallpaper, setcurrentWallpaper] = useState<string | null>(null);
  const [currentWallpaperStyle, setCurrentWallpaperStyle] =
    useState<"Fade" | "Ring" | "Bar" | null>(null);
  const [getStreak, setGetStreak] = useState(0)
  console.log(getStreak)

  const getTodos = async () => {

    try {
      const storedTodos = await AsyncStorage.getItem("TODOS_STORAGE")
      const todos: TodoType[] = storedTodos ? JSON.parse(storedTodos) : []
      const isFinished = todos.length > 0 && todos.every(
        (todo) => todo.completed === true
      );

      await AsyncStorage.setItem("streak", JSON.stringify(0))

      if (isFinished) {

        setGetStreak((prev) => prev + 1)
        await AsyncStorage.setItem(
          "streak",
          JSON.stringify(getStreak + 1)
        );

      }

    } catch (error) {

      console.log(error)

    }
  }



  useEffect(() => {
    getTodos()
  }, [])

  const getCurrentWallpaper = async () => {
    try {
      const getWallpaper = await AsyncStorage.getItem("currentWallpaper");
      const getWallpaperStyle = await AsyncStorage.getItem("style");

      setcurrentWallpaper(getWallpaper as string);
      setCurrentWallpaperStyle(getWallpaperStyle as any);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentWallpaper();
  }, []);

  const [timeLine, settimeLine] = useState<TimeLine>({
    year: 0,
    day: "",
    month: "",
    date: 0,
  });

  const getTimeLine = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    const weeks = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday",
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

  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  const oneDay = 1000 * 60 * 60 * 24;

  const daysPassed =
    Math.floor((today.getTime() - startOfYear.getTime()) / oneDay) + 1;

  const totalDays =
    Math.floor((endOfYear.getTime() - startOfYear.getTime()) / oneDay) + 1;

  const daysRemaining = totalDays - daysPassed;
  const percent = Math.floor((daysPassed / totalDays) * 100);

  const strokeDashoffset =
    CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;


  return (
    <SafeAreaView ref={viewRef}>
      <ImageBackground
        source={{ uri: currentWallpaper as any }}
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

          <View
            className={`${currentWallpaperStyle === "Ring" ? "hidden" : ""
              } mt-16 items-center`}
          >
            <Text className="text-white text-[96px] font-light">
              {daysPassed}
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              days into {timeLine.year}
            </Text>
          </View>

          {currentWallpaperStyle === "Fade" ? (
            <View className="flex-row justify-center gap-2 mt-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <View
                  key={i}
                  className={`w-2 h-2 rounded-full ${i < Math.ceil((percent / 100) * 12)
                    ? "bg-blue-500"
                    : "bg-gray-700"
                    }`}
                />
              ))}
            </View>
          ) : currentWallpaperStyle === "Ring" ? (
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
          ) : currentWallpaperStyle === "Bar" ? (
            <View className="flex-row justify-center mt-6 px-10">
              <View className="w-full">
                <View className="h-2 rounded-full bg-gray-700 overflow-hidden">
                  <View
                    className="h-full rounded-full bg-[#6784e4]"
                    style={{ width: `${percent}%` }}
                  />
                </View>

                <View className="flex-row justify-between mt-2">
                  {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map(
                    (m, i) => (
                      <Text
                        key={i}
                        className={`text-[10px] font-semibold ${i <
                          Math.ceil((today.getMonth() + 1))
                          ? "text-blue-400"
                          : "text-gray-600"
                          }`}
                      >
                        {m}
                      </Text>
                    )
                  )}
                </View>
              </View>
            </View>
          ) : null}

          <Text
            className={`text-gray-500 text-xs text-center mt-5 ${currentWallpaperStyle === "Ring" ? "hidden" : ""
              }`}
          >
            {percent}% complete
          </Text>

          <View className="flex-row gap-4 justify-center mt-12">
            <View className="px-4 py-2 rounded-full border bg-black/50 border-gray-800">
              <Text className="text-blue-400 text-sm font-semibold">
                {daysPassed} days passed
              </Text>
            </View>

            <View className="px-4 py-2 rounded-full border bg-black/50 border-gray-800">
              <Text className="text-blue-400 text-sm font-semibold">
                {daysRemaining} days left
              </Text>
            </View>
          </View>
        </View>

        <View className="absolute bottom-6 bg-black/50 border border-gray-800 p-3 rounded-xl mx-3">
          <View className="flex  flex-row flex-wrap gap-1.5 ">
            {Array.from({ length: totalDays }).map((i: any, index) => (
              <View
                key={index}
              >
                <Text
                  key={index}
                  className={`w-1.5  h-1.5 rounded-sm ${index + 1 < daysPassed ? "bg-green-500" : "bg-slate-500"} `}
                >
                  {index + 1}
                </Text>
              </View>
            ))}
          </View>
        </View>

      </ImageBackground>

    </SafeAreaView>
  );
}