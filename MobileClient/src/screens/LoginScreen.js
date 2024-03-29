import { StyleSheet, View } from 'react-native'
import React from 'react'
import AuthForm from '../components/AuthForm'
import agent from '../api/agent'

const LoginScreen = ({ navigation }) => {
    const submit = (data) => {
        agent.Account.login(data).then(res => console.log('res', res)).catch(err => console.log('err', err.response))
        navigation.navigate('Home');
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