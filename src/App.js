// src/App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./components/Auth/RegisterScreen";
import TeacherDashboard from "./screens/TeacherDashboard";
import AttendanceForm from "./components/Attendance/AttendanceForm";
import AttendanceHistory from "./components/Attendance/AttendanceHistory";
import KnowledgeGradeForm from "./components/Grades/KnowledgeGradeForm";
import PracticeGradeForm from "./components/Grades/PracticeGradeForm";
import GradeReport from "./components/Grades/GradeReport";
import ExportReport from "./components/Reports/ExportReport";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeacherDashboard"
          component={TeacherDashboard}
          options={{ headerTitle: "Dashboard Guru" }}
        />

        {/* Routes for Attendance */}
        <Stack.Screen
          name="Attendance"
          component={AttendanceForm}
          options={{ headerTitle: "Form Absensi" }}
        />
        <Stack.Screen
          name="AttendanceHistory"
          component={AttendanceHistory}
          options={{ headerTitle: "Riwayat Absensi" }}
        />

        {/* Routes for Grading */}
        <Stack.Screen
          name="KnowledgeGrade"
          component={KnowledgeGradeForm}
          options={{ headerTitle: "Penilaian Pengetahuan" }}
        />
        <Stack.Screen
          name="PracticeGrade"
          component={PracticeGradeForm}
          options={{ headerTitle: "Penilaian Praktek" }}
        />
        <Stack.Screen
          name="GradeReport"
          component={GradeReport}
          options={{ headerTitle: "Laporan Penilaian" }}
        />

        {/* Route for Reports */}
        <Stack.Screen
          name="Reports"
          component={ExportReport}
          options={{ headerTitle: "Ekspor Laporan" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Komponen HomeScreen yang sudah didefinisikan sebelumnya
const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Selamat Datang di Aplikasi Absensi & Penilaian</Text>
    </View>
  );
};

export default App;
