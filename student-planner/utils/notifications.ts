import * as Notifications from "expo-notifications";

export async function scheduleTaskReminder(taskName: string, date: string) {
  try {
    const triggerDate = new Date(date);
    if (isNaN(triggerDate.getTime())) {
      throw new Error("Invalid date format");
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task Reminder",
        body: `Don't forget: ${taskName}`,
      },
      trigger: {
        type: "calendar",
        year: triggerDate.getFullYear(),
        month: triggerDate.getMonth() + 1, // bulan dimulai dari 0
        day: triggerDate.getDate(),
        hour: triggerDate.getHours(),
        minute: triggerDate.getMinutes(),
        second: 0,
      },
    });
  } catch (e) {
    console.log("Failed to schedule notification:", e);
  }
}