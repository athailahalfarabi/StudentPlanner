import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import CheckBox from "expo-checkbox"; // Ensure you have this package installed
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


type Task = {
  name: string;
  deadline: string;
  completed: boolean;
};
export default function ViewTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const isFocused = useIsFocused();
  const router = useRouter(); 

  useEffect(() => {
    loadTasks();
  }, [isFocused]);

  const loadTasks = async () => {
    try {
      const json = await AsyncStorage.getItem("TASKS");
      setTasks(json ? JSON.parse(json) : []);
    } catch (e) {
      Alert.alert("Error", "Failed to load tasks.");
    }
  };

  const handleDelete = async (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    await AsyncStorage.setItem("TASKS", JSON.stringify(newTasks));
  };
  const handleToggleComplete = async (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    await AsyncStorage.setItem("TASKS", JSON.stringify(newTasks));
    if (newTasks[index].completed) {
      Alert.alert("Sukses", "Tugas telah dilaksanakan!");
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.taskItem}>
      <CheckBox
        value={!!item.completed}
        onValueChange={() => handleToggleComplete(index)}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.taskName, item.completed && { textDecorationLine: "line-through", color: "#aaa" }]}>
          {item.name}
        </Text>
        <Text style={styles.taskDeadline}>Deadline: {item.deadline || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Link href={`/tasks/edit?index=${index}`} asChild>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.deleteText}>Edit</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert("Delete Task", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => handleDelete(index) },
          ])
        }
      >
        <Ionicons name="trash-outline" size={24} color="#fff" />
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/")}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>All Tasks</Text>
      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No tasks found.</Text>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(_, idx) => idx.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#708A58",
    marginBottom: 24,
    textAlign: "center",
  },
  emptyText: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  taskItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  taskDeadline: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: "#E57373",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",

  },
  editButton: {
    backgroundColor: "#708A58",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16, 
    flexDirection: "row",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
   backButton: {
    alignSelf: "flex-start",
    marginBottom: 12,
    backgroundColor: "#708A58",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
  actionText: {
    backgroundColor: "#708A58",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});