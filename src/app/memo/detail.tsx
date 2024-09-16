import { View, Text, ScrollView, StyleSheet } from "react-native";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";
import { router, useLocalSearchParams } from "expo-router";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../../config";
import { type Memo } from "../../../types/memo";
import { useEffect, useMemo, useState } from "react";

const handlePress = (id: string) => {
  router.push({ pathname: "/memo/edit", params: { id } });
};

const Detail = (): JSX.Element => {
  const id = String(useLocalSearchParams().id);

  const [memo, setMemo] = useState<Memo | null>(null);

  useEffect(() => {
    if (auth.currentUser === null) return;
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    const unsubscribe = onSnapshot(ref, (memoDoc) => {
      const { bodyText, updatedAt } = memoDoc.data() as Memo;
      setMemo({ id: memoDoc.id, bodyText, updatedAt });
    });
    return unsubscribe;
  }, []);

  const dateString = useMemo(() => {
    if (!memo) return;
    return memo.updatedAt.toDate().toLocaleString("ja-JP");
  }, [memo]);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {memo?.bodyText}
        </Text>
        <Text style={styles.memoDate}>{dateString}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>{memo?.bodyText}</Text>
      </ScrollView>
      <CircleButton
        onPress={() => handlePress(id)}
        style={{ top: 60, bottom: "auto" }}
      >
        <Icon name="pencil" size={40} color="#FFFFFF" />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  memoHeader: {
    backgroundColor: "#467FD3",
    height: 96,
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
  },
  memoDate: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingHorizontal: 27,
  },
  memoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
  },
});

export default Detail;
