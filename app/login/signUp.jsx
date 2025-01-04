import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'

export default function SignUp() {
    const router = useRouter();
    return (
        <View style={{
            padding: 20
        }}>
            <Text style={styles.headerText}>Create New Account</Text>
            <Text style={styles.subText}>Fill the Below Forms</Text>
            

            {/* create account Input Fields */}
            <View style={{
                padding: 10,
                marginTop: 5
            }} >
                <Text style={{ fontSize: 17, marginTop: 2 }}>Full Name</Text>
                <TextInput style={styles.textInput} placeholder='Enter Full Name' />
            </View>

            <View style={{
                padding: 10,
                marginTop: 5
            }} >
                <Text style={{ fontSize: 17, marginTop: 2 }}>Email</Text>
                <TextInput style={styles.textInput} placeholder='Enter Your Email' />
            </View>

            <View style={{
                padding: 10,
                marginTop: 5
            }} >
                <Text style={{ fontSize: 17 }}>Password</Text>
                <TextInput style={styles.textInput} placeholder='Enter Password'
                    secureTextEntry
                />
            </View>
            {/* Login input fields ends here */}

            {/* Clickable or button for Signin */}
            <TouchableOpacity style={styles?.button}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 'bold'
                }}>Create Account Now</Text>
            </TouchableOpacity>

            {/* Create New Account Button */}


            <TouchableOpacity style={styles?.Createbutton}
                onPress={() => router.push('/login/signIn')}
            // onPress={()=>router.push('/login/signIn')}
            >
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: Colors.PRIMARY,
                    fontWeight: 'bold'
                }}>Sign in</Text>
            </TouchableOpacity>

            <Text style={{
                textAlign: 'center',
                
                fontSize: 14
            }}>If you are already a member</Text>
            {/* Sign button ends here */}

        </View>
    )
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        color: Colors.PRIMARY
    },
    subText: {
        fontSize: 20,
        margin: 15,
        textAlign: 'center',
        color: Colors.DARK_GRAY
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        fontSize: 17,
        borderColor: Colors.PRIMARY
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: 25
    },
    Createbutton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 99,
        marginTop: 25,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    }
})