
"use client";

import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/shared/lib/ReduxStore";

export default function ReduxStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storeInstance, setStoreinstance] = useState<AppStore | null>(null);
  useEffect(() => {
    const setupReduxStore = () => {
      setStoreinstance(makeStore())
    }
    setupReduxStore();
  }, []);

  if (!storeInstance) {
    return null;
  }

  return <Provider store={storeInstance}>{children}</Provider>
}
