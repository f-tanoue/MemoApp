import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./icon";
import { Link } from "expo-router";
import { Memo } from "../../types/memo";
import { useMemo } from "react";

interface Props {
  memo: Memo;
}

const MemoListItem = (props: Props) => {
  const { memo } = props;
  if (!memo.bodyText || !memo.updatedAt) return;

  const dateString = useMemo(() => {
    if (!memo.updatedAt) return;
    return memo.updatedAt.toDate().toLocaleString("ja-JP");
  }, [memo.updatedAt]);

  return (
    <Link href="memo/detail" asChild>
      <TouchableOpacity>
        <View style={styles.memoListItem}>
          <View>
            <Text numberOfLines={1} style={styles.memoListItemTitle}>
              {memo.bodyText}
            </Text>
            <Text style={styles.memoListItemDate}>{dateString}</Text>
          </View>
          <TouchableOpacity>
            <Icon name="delete" size={32} color="#B0B0B0" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
});

export default MemoListItem;
