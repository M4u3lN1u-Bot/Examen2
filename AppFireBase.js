import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {user ? (
                    <>
                        <Text style={styles.welcomeText}>Bienvenido, {user.email}</Text>
                        <TouchableOpacity style={styles.button} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Log out</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>Log in</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="johndoe@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="********"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity>

                        <Text style={styles.linkText}>or,</Text>

                        <TouchableOpacity onPress={handleRegister}>
                            <Text style={styles.linkText}>sign up</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00a9c9',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    linkText: {
        marginTop: 12,
        color: '#333',
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
});
