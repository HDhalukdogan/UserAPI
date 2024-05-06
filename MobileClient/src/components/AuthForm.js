import React from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const AuthForm = ({ register, submit }) => {
  const { control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: register ? {
      name: '',
      email: '@test.com',
      password: 'Pa$$w0rd',
    }
      :
      {
        name: 'bob@test.com',
        password: 'Pa$$w0rd',
      },
  });

  const onSubmit = (data) => {
    submit(data);
    reset();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{register ? "Register" : "Login"}</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            style={styles.input}
            placeholder="E-Mail"
          />
        )}
      />
      {
        register && <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              style={styles.input}
              placeholder="EMAIL"
            />
          )}
        />
      }
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            style={styles.input}
            placeholder="Password"
          />
        )}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? '#34495e' : '#3498db'
          },
        ]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>{register ? "Register" : "Login"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#34495e',
    padding: 10,
    marginBottom: 20,
    width: '70%',
    borderRadius: 8,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AuthForm;
