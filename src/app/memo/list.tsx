import { View, StyleSheet } from "react-native";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import LogOutButton from "../../components/LogoutButton";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, auth } from "../../config";
import { type Memo } from "../../../types/memo";

const handlePress = () => {
  router.push("/memo/create");
};

const List = (): JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogOutButton />;
      },
    });
  }, []);

  useEffect(() => {
    //メモのデータを監視し、変更を反映させる
    if (auth.currentUser === null) return;
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    const q = query(ref, orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteMemos: Memo[] = [];
      snapshot.forEach((doc) => {
        const { bodyText, updatedAt } = doc.data();
        remoteMemos.push({ id: doc.id, bodyText, updatedAt });
      });
      setMemos(remoteMemos);
    });
    return unsubscribe;
  }, []);

  console.log(memos);

  return (
    <View style={styles.container}>
      <View>
        {memos.map((memo) => {
          return <MemoListItem memo={memo} />;
        })}
      </View>
      <CircleButton onPress={handlePress}>
        <Icon name="plus" size={40} color="#FFFFFF" />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default List;
