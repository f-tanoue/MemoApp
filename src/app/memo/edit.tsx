import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";
import { router, useLocalSearchParams } from "expo-router";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../../config";

const handlePress = (id: string, bodyText: string) => {
  if (auth.currentUser === null) return;
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  setDoc(ref, { bodyText, updatedAt: Timestamp.fromDate(new Date()) })
    .then(() => {
      router.back();
    })
    .catch(() => Alert.alert("更新に失敗しました。"));
};

const Edit = () => {
  const id = String(useLocalSearchParams().id);
  const [bodyText, setBodyText] = useState("");

  useEffect(() => {
    if (auth.currentUser === null) return;
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    getDoc(ref)
      .then((docRef) => {
        const remoteBodyText = docRef.data()?.bodyText;
        setBodyText(remoteBodyText);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          value={bodyText}
          style={styles.input}
          onChangeText={(text) => setBodyText(text)}
        />
      </View>
      <CircleButton onPress={() => handlePress(id, bodyText)}>
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
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
});

export default Edit;
