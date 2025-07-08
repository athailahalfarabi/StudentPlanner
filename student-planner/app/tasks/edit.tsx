import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TaskForm from "../../components/TaskForm";

export default function EditTask() {
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem("TASKS");
      const tasks = json ? JSON.parse(json) : [];
      const idx = typeof index === "string" ? parseInt(index, 10) : Array.isArray(index) ? parseInt(index[0], 10) : 0;
      setTask(tasks[idx]);
    })();
  }, [index]);
  const handleEdit = async (updatedTask: any) => {
    const json = await AsyncStorage.getItem("TASKS");
    const tasks = json ? JSON.parse(json) : [];
    const idx = typeof index === "string" ? parseInt(index, 10) : Array.isArray(index) ? parseInt(index[0], 10) : 0;
    tasks[idx] = updatedTask;
    await AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
    router.replace("/tasks/view");
  };

  if (!task) return null;
  return (
    <View style={styles.container}>
      <TaskForm initialTask={task} onSubmit={handleEdit} submitLabel="Save Changes" />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, backgroundColor: "#F6F8FC" } });