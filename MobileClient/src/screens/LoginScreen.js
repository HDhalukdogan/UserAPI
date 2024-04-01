import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import AuthForm from '../components/AuthForm'
import { Context } from '../context/AuthContext'

const LoginScreen = ({ navigation }) => {
    const {signin} = useContext(Context);
    const submit = (data) => {
        signin(data)
    }
    return (
        <View style={styles.container}>
            <AuthForm submit={submit} />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
})