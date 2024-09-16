import { View, TextInput, StyleSheet } from "react-native";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";
import { router } from "expo-router";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../../config";
import { useState } from "react";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";

const handlePress = async (bodyText: string) => {
  if (auth.currentUser === null) return;
  const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
  //メモを作成
  addDoc(ref, {
    bodyText,
    updateAt: Timestamp.fromDate(new Date()),
  })
    .then((docRef) => {
      console.log("success", docRef.id);
      router.back();
    })
    .catch((err) => {
      console.log(err);
    });
};

const Create = () => {
  const [bodyText, setBodyText] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={bodyText}
          style={styles.input}
          onChangeText={(text) => setBodyText(text)}
          autoFocus
        />
      </View>
      <CircleButton onPress={() => handlePress(bodyText)}>
        <Icon name="check" size={40} color="#FFFFFF" />
      </CircleButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Create;
