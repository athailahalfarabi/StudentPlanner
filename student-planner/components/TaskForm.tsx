import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// Pastikan name dan deadline bertipe string (tidak optional)
export type Task = {
  name: string;
  deadline: string;
  [key: string]: any;
};

type TaskFormProps = {
  initialTask?: Task;
  onSubmit: (task: Task) => void | Promise<void>;
  submitLabel?: string;
  deadlineLabel?: string;
  deadlinePlaceholder?: string;
};

export default function TaskForm({
  initialTask = { name: "", deadline: "" },
  onSubmit,
  submitLabel = "Save",
  deadlineLabel = "Deadline (YYYY-MM-DD)",
  deadlinePlaceholder = "YYYY-MM-DD",
}: TaskFormProps) {
  const [name, setName] = useState(initialTask.name);
  const [deadline, setDeadline] = useState(initialTask.deadline);

  return (
    <View>
      <Text style={styles.label}>Nama Tugas</Text>
      <TextInput
        style={styles.input}
        placeholder="Task name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>{deadlineLabel}</Text>
      <TextInput
        style={styles.input}
        placeholder={deadlinePlaceholder}
        value={deadline}
        onChangeText={setDeadline}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSubmit({ name, deadline })}
      >
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: "#fff", borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "#ddd" },
  button: { backgroundColor: "#708A58", borderRadius: 20, padding: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  label: { fontWeight: "bold", marginBottom: 4, color: "#333" },
});