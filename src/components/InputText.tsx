import { TextInput, StyleSheet } from "react-native";

interface Props {
  value: string;
}

const InputText = (props: Props) => {
  const { value } = props;
  return <TextInput style={styles.input} value={value} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF",
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
});
export default InputText;
