// src/components/Grades/KnowledgeGradeForm.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { supabase } from "../../../services/supabase";

const KnowledgeGradeForm = ({ route, navigation }) => {
  const { studentId, subjectId, classId } = route.params;
  const [grades, setGrades] = useState({
    uh1: "",
    uh2: "",
    uh3: "",
    uts: "",
    uas: "",
  });

  const handleChange = (field, value) => {
    setGrades((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.from("knowledge_grades").upsert([
        {
          student_id: studentId,
          teacher_id: supabase.auth.user()?.id,
          subject_id: subjectId,
          class_id: classId,
          ...grades,
          semester: 1,
          academic_year: "2024/2025",
        },
      ]);

      if (error) throw error;
      Alert.alert("Sukses", "Penilaian pengetahuan berhasil disimpan");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Penilaian Pengetahuan</Text>

      <View style={styles.formGroup}>
        <Text>UH 1:</Text>
        <TextInput
          value={grades.uh1}
          onChangeText={(value) => handleChange("uh1", value)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>UH 2:</Text>
        <TextInput
          value={grades.uh2}
          onChangeText={(value) => handleChange("uh2", value)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>UH 3:</Text>
        <TextInput
          value={grades.uh3}
          onChangeText={(value) => handleChange("uh3", value)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>UTS:</Text>
        <TextInput
          value={grades.uts}
          onChangeText={(value) => handleChange("uts", value)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>UAS:</Text>
        <TextInput
          value={grades.uas}
          onChangeText={(value) => handleChange("uas", value)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <Button title="Simpan Penilaian" onPress={handleSubmit} color="#007bff" />
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
});

export default KnowledgeGradeForm;
