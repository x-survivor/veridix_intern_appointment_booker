"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./ReduxStore";

export default function ReduxStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storeInstance, setStoreInstance] = useState<AppStore | null>(null);

  useEffect(() => {
    const setInstance = () => {
      setStoreInstance(makeStore());
    }
    setInstance();
  }, []);

  if (!storeInstance) {
    return null;
  }

  return <Provider store={storeInstance}>{children}</Provider>;
}
