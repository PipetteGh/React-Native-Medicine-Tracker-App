import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown:false}} >
        <Tabs.Screen name='index' 
            options={{
                tabBarLabel: "Home",
                tabBarIcon:({color,size}) => (
                    <FontAwesome name="home" size={28} color={color} />
                )
            }}
        />
        <Tabs.Screen name='AddNew' 
            options={{
                tabBarLabel: "Add New",
                tabBarIcon:({color,size}) => (
                    <FontAwesome name="plus-square" size={28} color={color} />
                )
            }}
        />
        <Tabs.Screen name='Profile' 
            options={{
                tabBarLabel: "Profile",
                tabBarIcon:({color,size}) => (
                    <FontAwesome name="user" size={28} color={color} />
                )
            }}
        />
    </Tabs>
  )
}