import React, {VoidFunctionComponent} from "react";
import {Box, Stack, StackDivider, StackItem, Text} from "@chakra-ui/layout";
import {Button, ButtonGroup} from "@chakra-ui/button";

import styles from "../App/App.module.scss";
import logo from "../assets/logo.svg";
import coin from "../assets/icons/coin.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import arrowLeft from "../assets/icons/arrow-left.svg";
import {User} from "~/App/types";

import UserContext from "./Context";

interface Props {
  setPage: any;
  user: User | undefined;
}

export default function Navbar({setPage}: Props) {
  const user = React.useContext(UserContext).state.user;
  const addPoints = React.useContext(UserContext).actions.addPoints;

  return (
    <div>
      <div className={styles.upDiv}>
        <img alt="logo" src={logo} />
        <div>
          <span>{user?.name}</span>
          <span className={styles.coinSpan}>
            <img alt="coin" src={coin} /> {user?.points}
            <Button onClick={() => addPoints(1000)}>Agrega 1000</Button>
          </span>
        </div>
      </div>
      <div className={styles.header}>
        <h2>Electronics</h2>
      </div>
      <div className={styles.filter}>
        <Stack
          align="center"
          direction="row"
          divider={<StackDivider borderColor="gray.200" />}
          justifyContent="space-around"
          spacing={4}
        >
          <StackItem>{`16 of 32 products`}</StackItem>
          <ButtonGroup alignItems="center">
            <StackItem color="gray">Sort by</StackItem>
            <StackDivider />
            <Button borderRadius="3xl" color="gray" colorScheme="gray" variant="solid">
              Most recent
            </Button>
            <Button borderRadius="3xl" color="gray" colorScheme="gray" variant="solid">
              Lowest price
            </Button>
            <Button borderRadius="3xl" color="gray" colorScheme="gray" variant="solid">
              Highest price
            </Button>
          </ButtonGroup>
        </Stack>
        <div className={styles.arrowButtons}>
          <img alt="flechaizq" src={arrowLeft} onClick={() => setPage(0)} />
          <img alt="flecha" src={arrowRight} onClick={() => setPage(1)} />
        </div>
      </div>
    </div>
  );
}
