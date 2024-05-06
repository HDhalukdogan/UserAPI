import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AuthForm from '../components/AuthForm'
import { Context } from '../context/AuthContext'
import agent from '../api/agent'

const LoginScreen = ({ navigation }) => {
    const [register, setRegister] = useState(false)
    const {signin} = useContext(Context);
    const submit = (data) => {
        if (register) {
            agent.Account.register(data).then(()=> setRegister(!register)).catch(err=>console.log('err', err.response))
        } else {
        signin(data)
        }
    }
    return (
        <View style={styles.container}>
            <AuthForm submit={submit} register={register} />
            <Pressable onPress={()=> setRegister(!register)}>
                <Text>
                    {register ? "Login":"Register"}
                </Text>
            </Pressable>
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