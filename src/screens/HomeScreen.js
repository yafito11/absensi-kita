// src/screens/HomeScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { supabase } from "../services/supabase";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Selamat Datang di Aplikasi Absensi & Penilaian
      </Text>
      <Text style={styles.subtitle}>Silakan masuk menggunakan akun Anda</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Masuk"
          onPress={() => navigation.navigate("Login")}
          color="#007bff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
});

export default HomeScreen;
