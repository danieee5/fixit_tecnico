import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

import HomeScreen from "../pages/HomeScreen";
import ServicesScreen from "../pages/ServicesScreen";
import ProfileScreen from "../pages/ProfileScreen";
import TechnicianProfileScreen from "../pages/TechnicianProfileScreen";
import MyServicesScreen from "../pages/MyServicesScreen";
import RequestsScreen from "../pages/RequestsScreen";
import TechnicianPerformanceScreen from "../pages/TechnicianPerformanceScreen";
import TechnicianRequestsScreen from "../pages/TechnicianRequestsScreen";
import RequestDetailScreen from "../pages/RequestDetailScreen";
import CertificationsScreen from "../pages/CertificationsScreen";
import HomeTabIcon from "../components/HomeTabIcon";
import ServicesTabIcon from "../components/ServicesTabIcon";
import ProfileTabIcon from "../components/ProfileTabIcon";

export type RootStackParamList = {
  Home: undefined;
  Services: undefined;
  Profile: undefined;
  TechnicianProfile: undefined;
  MyServices: undefined;
  Requests: undefined;
  TechnicianPerformance: undefined;
  TechnicianRequests: undefined;
  RequestDetail: { id: string };
  Certifications: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#EA8B49",
        tabBarInactiveTintColor: "#999999",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5E7EB",
          borderTopWidth: 1,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 10
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 5
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <HomeTabIcon color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarLabel: "Servicios",
          tabBarIcon: ({ color, size }) => (
            <ServicesTabIcon color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <ProfileTabIcon color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      >
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="TechnicianProfile" component={TechnicianProfileScreen} />
        <Stack.Screen name="MyServices" component={MyServicesScreen} />
        <Stack.Screen name="Requests" component={RequestsScreen} />
        <Stack.Screen name="TechnicianPerformance" component={TechnicianPerformanceScreen} />
        <Stack.Screen name="TechnicianRequests" component={TechnicianRequestsScreen} />
        <Stack.Screen name="RequestDetail" component={RequestDetailScreen} />
        <Stack.Screen name="Certifications" component={CertificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
