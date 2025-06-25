import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Ionicons name="school-outline" size={64} color="#708A58" style={styles.icon} />
      <Text style={styles.title}>Student Planner</Text>
      <Text style={styles.subtitle}>Organize your tasks and stay productive!</Text>
      <Link href="/tasks/add" asChild >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add New Task</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/tasks/view" asChild>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View All Tasks</Text>
      </TouchableOpacity>
      </Link>
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
    marginBottom: 32,
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
});