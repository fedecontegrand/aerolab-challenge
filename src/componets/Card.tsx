import React, {useContext} from "react";
import {Box, Text} from "@chakra-ui/layout";
import {Button} from "@chakra-ui/button";

import buyBag from "../assets/icons/buy-blue.svg";
import coin from "../assets/icons/coin.svg";
import buyBagWhite from "../assets/icons/buy-white.svg";
import styles from "../App/App.module.scss";
import {Product} from "~/App/types";

import Context from "./Context";

interface Props {
  product: Product;
  isSelected: boolean;
}
export default function Card({product, isSelected}: Props) {
  const points = useContext(Context).state.user.points;
  const addProduct = useContext(Context).actions.addProduct;
  const cost = product.cost;
  const canBuy = points >= cost;

  return (
    <Box
      key={product._id}
      boxShadow="xl"
      className={styles.product}
      cursor={canBuy ? "pointer" : "not-allowed"}
      dropShadow="xl"
      position="relative"
    >
      <Box className={styles.sasa} zIndex={1}>
        {!isSelected ? (
          <img
            alt="buybag"
            src={buyBag}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          />
        ) : null}
        <img alt="prodimg" src={product.img.url} />
        <p>{product.category}</p>
        <span>{product.name}</span>
      </Box>
      {isSelected && (
        <>
          <Box
            backgroundColor={"blue.200"}
            height={"100%"}
            left={0}
            opacity="0.7"
            position="absolute"
            top={0}
            width={"100%"}
            zIndex={2}
          />
          <Box
            _hover={{cursor: "pointer"}}
            alignItems="center"
            bottom={0}
            className={styles.soso}
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            zIndex={3}
          >
            <img
              alt="buybag"
              src={buyBagWhite}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            />
            <Text>
              {product.cost}
              <img alt="coin" src={coin} />
            </Text>

            <Button
              backgroundColor="orangered"
              disabled={!canBuy}
              onClick={() => addProduct(product._id)}
            >
              Redeem now
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
