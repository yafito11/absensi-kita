// src/components/Auth/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { signUp } from "../../services/supabase";

const subjects = [
  "Teknologi Informasi",
  "Alqur'an",
  "Aqidah Akhlak",
  "Fiqih",
  "Bahasa Arab",
  "Kimia",
  "Sejarah",
  "Bahasa Inggris",
  "Biologi",
];

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleRegister = async () => {
    try {
      // Daftar pengguna di Supabase
      const { user, session } = await signUp(email, password, { name });

      // Simpan informasi guru
      const { data, error } = await supabase
        .from("teachers")
        .insert([{ id: user.id, name, email }]);

      if (error) throw error;

      // Simpan mata pelajaran yang dipilih
      const teacherSubjects = selectedSubjects.map((subjectId) => ({
        teacher_id: user.id,
        subject_id: subjectId,
      }));

      await supabase.from("teacher_subjects").insert(teacherSubjects);

      Alert.alert("Sukses", "Registrasi berhasil!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Daftar Guru
      </Text>

      <TextInput
        placeholder="Nama"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 15,
        }}
      />

      <Text style={{ fontSize: 18, marginVertical: 10 }}>
        Pilih Mata Pelajaran:
      </Text>
      <View
        style={{
          maxHeight: 200,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
        }}
      >
        {subjects.map((subject, index) => (
          <Picker.Item key={index} label={subject} value={index} />
        ))}
      </View>

      <Button title="Daftar" onPress={handleRegister} color="#007bff" />
    </ScrollView>
  );
};

export default RegisterScreen;
