import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import InputText from "../../components/InputText";
import Button from "../../components/Button";
import { Link, router } from "expo-router";
import { useState } from "react";
import { auth } from "../../config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = (email: string, password: string) => {
    // 会員登録
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Eメールとパスワードの登録に成功したとき
        router.replace("/memo/list");
        console.log(userCredential.user.uid);
      })
      .catch((error) => {
        //Eメールとパスワードの登録に失敗したとき
        const { code, message } = error;
        Alert.alert(message);
        console.log(code, message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
        <InputText
          value={email}
          onChange={(text) => setEmail(text)}
          type="email"
          placeholder="Email Address"
        />
        <InputText
          value={password}
          onChange={(password) => setPassword(password)}
          type="password"
          placeholder="Password"
        />
        <Button label="Submit" onPress={() => handlePress(email, password)} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <Link href="auth/log_in" asChild replace>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Log in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  footer: {
    flexDirection: "row",
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: "#000000",
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3",
  },
});

export default SignUp;
