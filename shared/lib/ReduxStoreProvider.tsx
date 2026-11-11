
"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/shared/lib/ReduxStore";

export default function ReduxStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storeInstance] = useState<AppStore>(() => makeStore());
  return <Provider store={storeInstance}>{children}</Provider>
}
