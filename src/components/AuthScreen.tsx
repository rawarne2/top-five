import React, { useState } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import { useMutation } from "react-query";
import axios from "axios";

const access_token = "ACCESS_TOKEN"; // replace with your access token

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  // baseURL: "https://blessed-constantly-hornet.ngrok-free.app/", // ngrok static url. Needed for testing on external devices. errors sometimes to reload ngrok server
  headers: {
    Authorization: `Bearer ${access_token}`,
    Accept: "application/json",
    timeout: 5000,
    "Content-Type": "application/json",
  },
});

type User = {
  id: number;
  first_name: string;
  email: string;
} | null;

function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User>(null);
  const loginMutation = useMutation(async () => {
    await api
      .post("api/users/login/", { username: email, password })
      .then((res) => {
        console.log("response >>>", res);
        setUser(res?.data);
        return res?.data?.token;
      })
      .catch((error) => {
        console.log("error >>>", error);
      });
  });

  const handleLogin = () => {
    // Trigger the login mutation
    console.log("loginMutation!!!!!");
    loginMutation.mutate();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {!loginMutation.isSuccess && (
        <Button
          title="Login"
          onPress={handleLogin}
          disabled={loginMutation.isLoading}
        />
      )}
      <Text>{loginMutation.isLoading ? "Logging in..." : ""}</Text>
      <Text>{loginMutation.isError ? "Error logging in" : ""}</Text>
      <Text>
        {loginMutation.isSuccess
          ? `Logged in! Welcome ${user?.first_name}`
          : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    paddingTop: 24,
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default AuthScreen;
