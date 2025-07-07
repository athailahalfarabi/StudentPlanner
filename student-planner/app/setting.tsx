import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function SettingScreen() {
  const [notifEnabled, setNotifEnabled] = useState(true);

  const handleToggleNotif = async () => {
    setNotifEnabled(!notifEnabled);
  await AsyncStorage.setItem("NOTIF_ENABLED", JSON.stringify(!notifEnabled));
  };

  const handleReset = async () => {
    Alert.alert(
      "Reset Data",
      "Are you sure you want to delete all tasks?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("TASKS");
            Alert.alert("Success", "All tasks deleted.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch value={notifEnabled} onValueChange={handleToggleNotif} />
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Reset All Tasks</Text>
      </TouchableOpacity>
      <Text style={styles.info}>Student Planner v1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FC", padding: 24 },
  title: { fontSize: 24, fontWeight: "bold", color: "#708A58", marginBottom: 24, textAlign: "center" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  label: { fontSize: 16, color: "#333" },
  resetButton: { backgroundColor: "#E57373", padding: 12, borderRadius: 16, alignItems: "center", marginTop: 24 },
  resetText: { color: "#fff", fontWeight: "bold" },
  info: { marginTop: 40, textAlign: "center", color: "#aaa" },
});