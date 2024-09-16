import { Redirect } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config";
import { useEffect } from "react";
import { router } from "expo-router";

const Index = (): JSX.Element => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.replace("/memo/list");
      }
    });
  }, []);
  return <Redirect href="auth/log_in" />;
};

export default Index;
