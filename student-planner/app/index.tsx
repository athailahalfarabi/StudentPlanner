import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Task = {
  name?: string;
  title?: string;
  deadline?: string;
  completed?: boolean;
  [key: string]: any;
};

export default function Index() {
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const isFocused = useIsFocused();

  // Minta izin notifikasi sekali saat mount
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission", "Permission for notifications not granted");
      }
    })();
  }, []);

  // Ambil tugas hari ini setiap kali halaman dibuka
  useEffect(() => {
    const loadTodayTasks = async () => {
      const json = await AsyncStorage.getItem("TASKS");
      const tasks: Task[] = json ? JSON.parse(json) : [];
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const filtered = tasks.filter((t) => t.deadline && t.deadline.startsWith(today));
      setTodayTasks(filtered.slice(0, 3)); // tampilkan 3 tugas teratas
    };
    loadTodayTasks();
  }, [isFocused]); [];

  return (
    <View style={styles.container}>
      <Ionicons name="school-outline" size={64} color="#708A58" style={styles.icon} />
      <Text style={styles.title}>Student Planner</Text>
      <Text style={styles.subtitle}>Organize your tasks and stay productive!</Text>
      <Link href="/tasks/add" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tambah Tugas</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/tasks/view" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lihat Semua Tugas</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/calender" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Kalendar</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.taskPreview}>
        <Text style={styles.taskTitle}>Tugas Hari Ini</Text>
        {todayTasks.length === 0 ? (
          <Text style={styles.taskItem}>🎉 Azeekk Gada Tugas 🎉</Text>
        ) : (
          todayTasks.map((task, idx) => (
            <View key={idx} style={styles.taskRow}>
              <Text
                style={[
                  styles.taskItem,
                  task.completed && { textDecorationLine: "line-through", color: "#aaa" },
                ]}
              >
                • {task.name || task.title}
              </Text>
              {task.completed && (
                <Ionicons name="checkmark-circle" size={18} color="#4F8EF7" style={{ marginLeft: 6 }} />
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#708A58",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskPreview: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 16,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#708A58",
  },
  taskItem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});