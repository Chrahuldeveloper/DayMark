import { View, Text, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWallpaper } from '../context/WallpaperContext'

interface TimeLine {
    year: number,
    day: string,
    month: string,
    date: number
}

export default function Wallpaper() {

    const { wallpaper } = useWallpaper()

    console.log(wallpaper)


    const [timeLine, settimeLine] = useState<TimeLine>({
        year: 0,
        day: "",
        month: "",
        date: 0
    })

    const getTimeLine = () => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const weeks = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        const date = new Date();

        const currentYear = date.getFullYear()
        const currentDate = date.getDate();
        const currentMonth = months[date.getMonth()];
        const currentDay = weeks[date.getDay()]

        settimeLine({
            year: currentYear,
            day: currentDay,
            month: currentMonth,
            date: currentDate
        })
    }


    useEffect(() => {
        getTimeLine()
    }, [])

    return (
        <SafeAreaView>
            <ImageBackground
                source={{
                    uri: wallpaper as any,
                }}
                className="w-screen h-screen"
                resizeMode="cover"
                blurRadius={2}
            >
                <View className="flex-1 bg-black/60">

                    <View className="mt-24 items-center">
                        <Text className="text-white text-2xl font-semibold">{timeLine.year}</Text>
                        <Text className="text-gray-400 text-sm mt-1">
                            {timeLine.day}, {timeLine.month} {timeLine.day}
                        </Text>
                    </View>

                    <View className="mt-16 items-center">
                        <Text className="text-white text-[96px] font-light">37</Text>
                        <Text className="text-gray-400 text-sm mt-2">
                            days into 2026
                        </Text>
                    </View>

                    <View className="flex-row justify-center gap-2 mt-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <View
                                key={i}
                                className={`w-2 h-2 rounded-full ${i < 2 ? "bg-blue-500" : "bg-gray-700"
                                    }`}
                            />
                        ))}
                    </View>

                    <Text className="text-gray-500 text-xs text-center mt-3">
                        10% complete
                    </Text>

                    <View className="flex-row gap-4 justify-center mt-8">
                        <View className="px-4 py-2 rounded-full border border-gray-700">
                            <Text className="text-blue-400 text-sm">
                                37 days passed
                            </Text>
                        </View>

                        <View className="px-4 py-2 rounded-full border border-gray-700">
                            <Text className="text-blue-400 text-sm">
                                328 days left
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
