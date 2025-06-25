import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddTask() {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const router = useRouter();

  const handleAdd = async () => {
    if (!task.trim()) {
      Alert.alert("Validation", "Task name cannot be empty!");
      return;
    }
    try {
      // Ambil tasks lama
      const json = await AsyncStorage.getItem("TASKS");
      const oldTasks = json ? JSON.parse(json) : [];
      // Tambah task baru
      const newTasks = [
        ...oldTasks,
        { name: task, deadline: deadline }
      ];
      await AsyncStorage.setItem("TASKS", JSON.stringify(newTasks));
      setTask("");
      setDeadline("");
      // Navigasi ke halaman view all tasks
      router.replace("/tasks/view");
    } catch (e) {
      Alert.alert("Error", "Failed to save task.");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task name"
        value={task}
        onChangeText={setTask}
      />
      <TextInput
        style={styles.input}
        placeholder="Deadline (e.g. 2025-06-30)"
        value={deadline}
        onChangeText={setDeadline}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#708A58",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#708A58",
  },
  button: {
    backgroundColor: "#708A58",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});