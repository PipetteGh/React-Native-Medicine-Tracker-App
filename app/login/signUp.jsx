import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
import { auth } from '../../config/FirebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setLocalStorage } from '../../service/Storage'

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullName] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    // Function to handle creating of new account
    const OnCreateAccount = () => {
        // check empty fields or errors
        if (!email || !password || !fullname) {
            Alert.alert("Please enter email & password");
            return;
        }

        // Validate email format using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Please enter a valid email address");
            return;
        }

        // Check password length
        if (fullname.length < 5) {
            Alert.alert("Full name must be at least 5 characters long");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Password must be at least 6 characters long");
            return;
        }

        setLoading(true); // Show loading spinner

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: fullname
                });

                // locally store user details on the device
                await setLocalStorage('userDetail', JSON.stringify(user));
                setLoading(false); // Hide loading spinner
                console.log(JSON.stringify(user));
                router.push('(tabs)');
            })
            .catch((error) => {
                setLoading(false); // Hide loading spinner
                const errorCode = error.code;
                if (errorCode === 'auth/email-already-in-use') {
                    Alert.alert("Account with " + email + " already exists");
                } else {
                    Alert.alert("Error", error.message);
                }
            });
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={styles.headerText}>Create New Account</Text>
            <Text style={styles.subText}>Fill the Below Forms</Text>

            {/* create account Input Fields */}
            <View style={{ padding: 10, marginTop: 5 }} >
                <Text style={{ fontSize: 17, marginTop: 2 }}>Full Name</Text>
                <TextInput style={styles.textInput} placeholder='Enter Full Name'
                    onChangeText={(value) => setFullName(value)}
                />
            </View>

            <View style={{ padding: 10, marginTop: 5 }} >
                <Text style={{ fontSize: 17, marginTop: 2 }}>Email</Text>
                <TextInput style={styles.textInput} placeholder='Enter Your Email'
                    onChangeText={(value) => setEmail(value)}
                />
            </View>

            <View style={{ padding: 10, marginTop: 5 }} >
                <Text style={{ fontSize: 17 }}>Password</Text>
                <TextInput style={styles.textInput} placeholder='Enter Password'
                    secureTextEntry={true}
                    onChangeText={(value) => setPassword(value)}
                />
            </View>

            {/* Show spinner when loading */}
            {loading ? (
                <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: 20 }} />
            ) : (
                <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        color: 'white',
                        fontWeight: 'bold'
                    }}>Create Account Now</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.Createbutton}
                onPress={() => router.push('/login/signIn')}
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
        </View>
    );
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
});