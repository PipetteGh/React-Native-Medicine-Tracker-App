import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
    const router = useRouter(); 
  return (
    <View>
        <View style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 20
        }}  >
            
            <Image source={require('../../assets/images/book.png')} 
            style={styles?.Image}
            />
        </View>

        <View style={{
            padding:25,
            backgroundColor:Colors.PRIMARY,
            height: '100%',
            borderRadius:30
        }} >
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center'
            }} >Stay on Track, Stay Healthy!</Text>

            {/* small text of description */}
            <Text style={{
                marginTop: 20,
                color: 'white',
                textAlign: 'center',
                fontSize: 17

            }} >Track your medicine, take control of your health. Stay consistent, stay confident</Text>
        
        {/* Login Button */}
        <TouchableOpacity style={styles?.button} 
        onPress={()=>router.push('/login/signIn')}
        >
        
            <Text style={{
                      textAlign: 'center',
                      fontSize: 20,
                      color: Colors.PRIMARY,
                      fontWeight: 'bold'
            }}>Continue</Text>

            
        </TouchableOpacity>
        <Text style={{
            color: 'white',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 10
        }} >Note: By clicking Continue, you agree to Soluotech's terms and condition</Text>

        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    Image:{
        width: 370,
        height: 410,
        borderRadius: 20
    },
    button: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 99,
        marginTop: 25

    }

})