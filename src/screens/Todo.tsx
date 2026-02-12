import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import BottomBar from "@/components/BottomBar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";


type TodoType = {
    id: string;
    text: string;
    completed: boolean;
};


export default function Todo() {

    const [task, setTask] = useState("");
    const [todos, setTodos] = useState<TodoType[]>([]);

    const STORAGE_KEY = "TODOS_STORAGE";

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
            setTodos(JSON.parse(data));
        }
    };

    const saveTodos = async (updatedTodos: TodoType[]) => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    };

    const addTodo = () => {
        if (!task.trim()) return;

        const newTodo: TodoType = {
            id: Date.now().toString(),
            text: task,
            completed: false,
        };

        const updatedTodos = [newTodo, ...todos];
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
        setTask("");
    };

    const toggleTodo = (id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };

    const deleteTodo = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };


    return (

        <>
            <SafeAreaView>
                <View className="bg-black w-screen h-full">
                    <Text className="text-white text-3xl p-6 font-bold mb-6">
                        Todo
                    </Text>

                    <View className="flex-row items-center bg-zinc-900 rounded-2xl px-3 py-2 mx-6 mb-6">
                        <TextInput
                            value={task}
                            onChangeText={setTask}
                            placeholder="Add a new task..."
                            placeholderTextColor="#6b7280"
                            className="flex-1 text-white text-base"
                        />
                        <TouchableOpacity
                            onPress={addTodo}
                            className="bg-[#6784e4] px-4 py-2 rounded-lg ml-3"
                        >
                            <Text className="text-white text-sm font-semibold">
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="px-6">
                        {todos.map(todo => (
                            <View
                                key={todo.id}
                                className="flex-row items-center justify-between bg-zinc-900 p-4 rounded-2xl mb-4"
                            >
                                <TouchableOpacity
                                    onPress={() => toggleTodo(todo.id)}
                                    className="flex-row items-center flex-1"
                                >
                                    <View
                                        className={`w-5 h-5 mr-4 rounded-full border-2 ${todo.completed
                                            ? "bg-white border-white"
                                            : "border-white"
                                            }`}
                                    />
                                    <Text
                                        className={`text-base ${todo.completed
                                            ? "text-gray-400 line-through"
                                            : "text-white"
                                            }`}
                                    >
                                        {todo.text}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                                    <Text className="text-red-500 font-semibold">
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                    <BottomBar page="Todo" />
                </View>
            </SafeAreaView>

        </>
    );
}
