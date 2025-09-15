// src/screens/TeacherDashboard.js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { supabase } from "../services/supabase";

const TeacherDashboard = ({ navigation }) => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      const { data: teacherData } = await supabase
        .from("teachers")
        .select("*")
        .eq("id", supabase.auth.user()?.id)
        .single();

      const { data: classData } = await supabase
        .from("classes")
        .select("id, name");

      const { data: subjectData } = await supabase
        .from("teacher_subjects")
        .select("subjects(name)")
        .eq("teacher_id", teacherData.id);

      setClasses(classData || []);
      setSubjects(subjectData?.map((s) => s.subjects) || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Guru</Text>

      <View style={styles.buttonGroup}>
        <Button
          title="Absensi"
          onPress={() => navigation.navigate("Attendance")}
          color="#007bff"
        />

        <Button
          title="Penilaian"
          onPress={() => navigation.navigate("Grading")}
          color="#28a745"
        />

        <Button
          title="Laporan"
          onPress={() => navigation.navigate("Reports")}
          color="#ffc107"
        />
      </View>
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
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default TeacherDashboard;
