// src/screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { supabase } from "../services/supabase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Cek apakah pengguna adalah guru
      const { data: teacherData } = await supabase
        .from("teachers")
        .select("id")
        .eq("email", email)
        .single();

      if (!teacherData) {
        Alert.alert("Error", "Anda bukan pengguna yang terdaftar sebagai guru");
        return;
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "TeacherDashboard" }],
      });
    } catch (error) {
      Alert.alert("Login Gagal", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masuk</Text>

      <View style={styles.formGroup}>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <Button title="Masuk" onPress={handleLogin} color="#007bff" />

      <View style={styles.registerLink}>
        <Text style={styles.linkText}>Belum punya akun? </Text>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Daftar
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
  registerLink: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
