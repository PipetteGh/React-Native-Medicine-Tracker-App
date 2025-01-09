import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
export default function AddMedicationHeader() {
  return (
    <View>
      <Image source={require('../assets/images/consult.png')} style={{
        height: 200,
        width: '100%'
      }} />

      <TouchableOpacity style={{
        position: 'absolute',
        padding: 25
      }} 
      onPress={()=>router.back()}
      >
        <Ionicons name="arrow-back-circle" size={44} color="black" />
      </TouchableOpacity>
    </View>
    
  )
}