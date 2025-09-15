// src/components/Grades/GradeReport.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { supabase } from "../../services/supabase";

const GradeReport = ({ route, navigation }) => {
  const { classId, subjectId } = route.params;
  const [students, setStudents] = useState([]);
  const [knowledgeGrades, setKnowledgeGrades] = useState({});
  const [practiceGrades, setPracticeGrades] = useState({});

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      // Ambil daftar siswa
      const { data: studentData } = await supabase
        .from("students")
        .select("id, name")
        .eq("class_id", classId);

      // Ambil penilaian pengetahuan
      const { data: knowledgeData } = await supabase
        .from("knowledge_grades")
        .select("*")
        .in(
          "student_id",
          studentData.map((s) => s.id)
        )
        .eq("subject_id", subjectId);

      // Ambil penilaian praktek
      const { data: practiceData } = await supabase
        .from("practice_grades")
        .select("*")
        .in(
          "student_id",
          studentData.map((s) => s.id)
        )
        .eq("subject_id", subjectId);

      // Format data untuk tampilan
      const formattedKnowledge = {};
      const formattedPractice = {};

      knowledgeData.forEach((grade) => {
        formattedKnowledge[grade.student_id] = grade;
      });

      practiceData.forEach((grade) => {
        formattedPractice[grade.student_id] = grade;
      });

      setStudents(studentData);
      setKnowledgeGrades(formattedKnowledge);
      setPracticeGrades(formattedPractice);
    } catch (error) {
      console.error(error);
    }
  };

  const renderStudentRow = ({ item }) => {
    const knowledge = knowledgeGrades[item.id];
    const practice = practiceGrades[item.id];

    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.name}</Text>

        {knowledge && (
          <>
            <Text style={styles.cell}>{knowledge.uh1 || "-"}</Text>
            <Text style={styles.cell}>{knowledge.uh2 || "-"}</Text>
            <Text style={styles.cell}>{knowledge.uh3 || "-"}</Text>
            <Text style={styles.cell}>{knowledge.uts || "-"}</Text>
            <Text style={styles.cell}>{knowledge.uas || "-"}</Text>
            <Text style={styles.cell}>{knowledge.average || "-"}</Text>
            <Text style={styles.cell}>{knowledge.predicate || "-"}</Text>
          </>
        )}

        {practice && (
          <>
            <Text style={styles.cell}>{practice.practice1 || "-"}</Text>
            <Text style={styles.cell}>{practice.practice2 || "-"}</Text>
            <Text style={styles.cell}>{practice.average || "-"}</Text>
            <Text style={styles.cell}>{practice.predicate || "-"}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laporan Penilaian</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.bold]}>Nama Siswa</Text>

        <Text style={[styles.headerCell, styles.bold]}>UH1</Text>
        <Text style={[styles.headerCell, styles.bold]}>UH2</Text>
        <Text style={[styles.headerCell, styles.bold]}>UH3</Text>
        <Text style={[styles.headerCell, styles.bold]}>UTS</Text>
        <Text style={[styles.headerCell, styles.bold]}>UAS</Text>
        <Text style={[styles.headerCell, styles.bold]}>Rata-rata</Text>
        <Text style={[styles.headerCell, styles.bold]}>Predikat</Text>

        <Text style={[styles.headerCell, styles.bold]}>Praktek 1</Text>
        <Text style={[styles.headerCell, styles.bold]}>Praktek 2</Text>
        <Text style={[styles.headerCell, styles.bold]}>Rata-rata</Text>
        <Text style={[styles.headerCell, styles.bold]}>Predikat</Text>
      </View>

      <FlatList
        data={students}
        renderItem={renderStudentRow}
        keyExtractor={(item) => item.id}
        style={styles.list}
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
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
});

export default GradeReport;
