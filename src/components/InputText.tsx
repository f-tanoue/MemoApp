import { useMemo } from "react";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  value: string;
  onChange: (e: any) => void;
  type: "normal" | "password" | "email";
  placeholder?: string;
}

const InputText = (props: Props) => {
  const { value, onChange, type, placeholder } = props;

  const textContentType = useMemo(() => {
    switch (type) {
      case "email":
        return "emailAddress";
      case "normal":
        return "none";
      case "password":
        return "password";
    }
  }, [type]);

  const keyboardType = useMemo(() => {
    if (type === "email") {
      return "email-address";
    } else {
      return "default";
    }
  }, [type]);
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      autoCapitalize="none"
      keyboardType={keyboardType}
      secureTextEntry={type === "password"}
      placeholder={placeholder}
      textContentType={textContentType}
    />
  );
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
