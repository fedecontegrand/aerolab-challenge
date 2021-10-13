import {Center} from "@chakra-ui/layout";
import {CircularProgress} from "@chakra-ui/progress";
import axios from "axios";
import React from "react";
import react, {useEffect, useState} from "react";

import types, {apikey, Product, User} from "~/App/types";

export interface Context {
  state: {
    user: User;
  };
  actions: {
    addPoints: (amount: number) => Promise<void>;
    addProduct: (productId: string) => Promise<void>;
  };
}

const UserContext = React.createContext({} as Context);

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState<"pending" | "resolved" | "rejected">("pending");

  async function addPoints(amount: number) {
    if (!user) return;

    return types.points.add(amount).then(() => {
      setUser({...user, points: user?.points + amount});
    });
  }

  async function addProduct(productId: string): Promise<void> {
    if (!user) return;

    return types.addProduct(productId).then(() => types.fetch().then((data) => setUser(data)));
  }

  useEffect(() => {
    types
      .fetch()
      .then((data) => {
        setUser(data);
        setStatus("resolved");
      })
      .catch((error) => setStatus("rejected"));
  }, []);

  if (!user || status === "pending") {
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  const state: Context["state"] = {
    user,
  };
  const actions: Context["actions"] = {
    addPoints,
    addProduct,
  };

  return <UserContext.Provider value={{state, actions}}>{children}</UserContext.Provider>;
};

export {UserContext as default, UserProvider as Provider};
