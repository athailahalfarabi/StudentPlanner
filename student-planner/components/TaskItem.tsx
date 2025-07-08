import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TaskItem({ task, onDelete, onEdit }) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{task.name}</Text>
        <Text style={styles.deadline}>Deadline: {task.deadline || "-"}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.editBtn}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", marginBottom: 12, borderRadius: 10, padding: 14, elevation: 2 },
  name: { fontWeight: "bold", fontSize: 16 },
  deadline: { color: "#666", fontSize: 13 },
  actions: { flexDirection: "row" },
  editBtn: { marginRight: 12, backgroundColor: "#4F8EF7", borderRadius: 8, padding: 6 },
  deleteBtn: { backgroundColor: "#E57373", borderRadius: 8, padding: 6 },
  actionText: { color: "#fff", fontWeight: "bold" },
});