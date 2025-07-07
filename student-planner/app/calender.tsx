import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
  const [selected, setSelected] = useState("");
  const [tasksCount, setTasksCount] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!selected) {
        setTasksCount(0);
        return;
      }
      const json = await AsyncStorage.getItem("TASKS");
      const tasks = json ? JSON.parse(json) : [];
      const count = tasks.filter((t: any) => t.deadline === selected).length;
      setTasksCount(count);
    };
    fetchTasks();
  }, [selected]);

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </Link>
      <Text style={styles.title}>Academic Calendar</Text>
      <Calendar
        onDayPress={day => setSelected(day.dateString)}
        markedDates={{
          [selected]: { selected: true, selectedColor: "#708A58" },
        }}
        theme={{
          todayTextColor: "#4F8EF7",
          arrowColor: "#708A58",
        }}
      />
      {selected ? (
        <Text style={styles.selectedText}>
          Selected: {selected} {"\n"}
          {tasksCount > 0
            ? `You have ${tasksCount} task(s) on this date.`
            : "No tasks on this date."}
        </Text>
      ) : (
        <Text style={styles.selectedText}>Select a date to view details.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FC", padding: 20 },
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
  title: {
     fontSize: 24, fontWeight: "bold", color: "#708A58", marginBottom: 16, textAlign: "center" },
  selectedText: {
     marginTop: 20, fontSize: 16, color: "#333", textAlign: "center" },
});