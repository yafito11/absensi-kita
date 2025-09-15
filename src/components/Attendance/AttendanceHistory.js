// src/components/Attendance/AttendanceHistory.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { supabase } from "../../../services/supabase";

const AttendanceHistory = ({ route }) => {
  const { classId, subjectId } = route.params;
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  const fetchAttendanceHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("attendance")
        .select(
          `
          *,
          students(name),
          classes(name)
        `
        )
        .eq("class_id", classId)
        .eq("subject_id", subjectId)
        .order("date", { ascending: false });

      if (error) throw error;
      setAttendanceRecords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderAttendanceItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text>{item.date}</Text>
      <Text>Siswa: {item.students.name}</Text>
      <Text>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Absensi</Text>
      <FlatList
        data={attendanceRecords}
        renderItem={renderAttendanceItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default AttendanceHistory;
