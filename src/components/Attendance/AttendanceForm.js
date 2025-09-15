// src/components/Attendance/AttendanceForm.js
import React, { useState } from "react";
import { View, Text, Picker, Button, StyleSheet } from "react-native";
import { supabase } from "../../../services/supabase";

const AttendanceForm = ({ route, navigation }) => {
  const { classId, subjectId } = route.params;
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("hadir");

  const handleSubmit = async () => {
    try {
      // Ambil daftar siswa di kelas
      const { data: students } = await supabase
        .from("students")
        .select("id")
        .eq("class_id", classId);

      // Buat entri absensi untuk setiap siswa
      const attendanceData = students.map((student) => ({
        student_id: student.id,
        teacher_id: supabase.auth.user()?.id,
        subject_id: subjectId,
        class_id: classId,
        date,
        status,
      }));

      await supabase.from("attendance").insert(attendanceData);

      Alert.alert("Sukses", "Absensi berhasil disimpan");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Absensi</Text>

      <View style={styles.formGroup}>
        <Text>Tanggal:</Text>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Status:</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Hadir" value="hadir" />
          <Picker.Item label="Tidak Hadir" value="tidak_hadir" />
          <Picker.Item label="Izin" value="izin" />
          <Picker.Item label="Sakit" value="sakit" />
        </Picker>
      </View>

      <Button title="Simpan Absensi" onPress={handleSubmit} color="#28a745" />
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
  formGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default AttendanceForm;
