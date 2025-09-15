// src/components/Reports/ExportReport.js
import React, { useState } from "react";
import { View, Text, Picker, Button, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { supabase } from "../../../services/supabase";

const ExportReport = ({ route, navigation }) => {
  const [filterDate, setFilterDate] = useState("");
  const [filterClass, setFilterClass] = useState("");

  const generateExcel = async () => {
    try {
      // Ambil data laporan
      const { data: reportData, error } = await supabase.rpc(
        "generate_report",
        {
          filter_date: filterDate,
          filter_class: filterClass,
        }
      );

      if (error) throw error;

      // Generate file CSV
      const csvContent = convertToCSV(reportData);
      const filePath = `${
        FileSystem.documentDirectory
      }report_${new Date().getTime()}.csv`;

      await FileSystem.writeAsStringAsync(filePath, csvContent);

      // Bagikan file
      await Sharing.shareAsync(filePath);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));
    return [headers, ...rows].join("\n");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ekspor Laporan</Text>

      <View style={styles.formGroup}>
        <Text>Tanggal:</Text>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Kelas:</Text>
        <Picker
          selectedValue={filterClass}
          onValueChange={(itemValue) => setFilterClass(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Semua Kelas" value="" />
          <Picker.Item label="X.1" value="X.1" />
          <Picker.Item label="X.2" value="X.2" />
          {/* Tambahkan opsi lainnya */}
        </Picker>
      </View>

      <Button
        title="Generate & Share Excel"
        onPress={generateExcel}
        color="#28a745"
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

export default ExportReport;
