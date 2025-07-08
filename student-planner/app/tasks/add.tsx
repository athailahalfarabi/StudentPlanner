import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskForm from "../../components/TaskForm";

// Export Task type for reuse
export type Task = {
  name: string;
  deadline: string;
  [key: string]: any;
};

export default function AddTask() {
  const router = useRouter();

  const handleAdd = async (task: Task) => {
    if (!task.name.trim()) {
      Alert.alert("Validasi", "Nama tugas harus diisi!");
      return;
    }
    if (!task.deadline || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(task.deadline)) {
      Alert.alert(
        "Validasi",
        "Deadline harus diisi dengan format YYYY-MM-DDTHH:mm (misal: 2025-07-05T14:30)"
      );
      return;
    }
    const json = await AsyncStorage.getItem("TASKS");
    const oldTasks = json ? JSON.parse(json) : [];
    const newTasks = [...oldTasks, { ...task, completed: false }];
    await AsyncStorage.setItem("TASKS", JSON.stringify(newTasks));
    router.replace("/tasks/view");
  };

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
      </Link>
      <Text style={styles.header}>Tambah Tugas Baru</Text>
      <TaskForm
        onSubmit={handleAdd}
        submitLabel="Tambah Tugas"
        deadlineLabel="Deadline (contoh: 2025-07-05 14:30)"
        deadlinePlaceholder="Tahun-Bulan-Hari Jam"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F6F8FC" },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
    backgroundColor: "#708A58",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  backButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#708A58",
    marginBottom: 24,
    textAlign: "center",
  },
});