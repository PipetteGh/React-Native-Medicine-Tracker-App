import { View, Text, Button } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { auth } from '../../config/FirebaseConfig'
import { signOut } from 'firebase/auth'

export default function HomeScreen() {
  
  return (
    <View>
      <Text>HomeScrreen</Text>
      <Button title='Log Out' onPress={()=>signOut(auth)} />
      
    </View>
  )
}