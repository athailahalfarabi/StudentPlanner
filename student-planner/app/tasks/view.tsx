import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

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

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.taskItem}>
      <View>
        <Text style={styles.taskName}>{item.name}</Text>
        <Text style={styles.taskDeadline}>Deadline: {item.deadline || "-"}</Text>
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
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
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
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});