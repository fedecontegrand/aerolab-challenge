import {CircularProgress, Flex, Text, Heading, Stack} from "@chakra-ui/react";
import * as React from "react";

import api from "~/product/api";
import {Product} from "~/product/types";
import header from "~/assets/header.png";
import ProductsList from "~/product/components/ProductsList";

const HomeScreen: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending");

  React.useEffect(() => {
    api
      .list()
      .then((products) => {
        setProducts(products);
        setStatus("resolved");
      })
      .catch(() => {
        setProducts([]);
        setStatus("rejected");
      });
  }, []);

  if (status === "rejected") {
    return (
      <Flex alignItems="center" justifyContent="center" paddingY={12}>
        <Text backgroundColor="primary.100" borderRadius="md" color="primary.700" padding={4}>
          Press F to pay respect
        </Text>
      </Flex>
    );
  }

  if (status === "pending") {
    return (
      <Flex alignItems="center" justifyContent="center" paddingY={12}>
        <CircularProgress isIndeterminate color="primary.500" />
      </Flex>
    );
  }

  return (
    <Stack flex={1} spacing={6}>
      <Flex
        alignItems="flex-end"
        backgroundImage={`url(${header})`}
        backgroundSize="cover"
        borderRadius="md"
        justifyContent="flex-start"
        minHeight={64}
        padding={6}
      >
        <Heading color="white" fontSize="4xl">
          Electronics
        </Heading>
      </Flex>
      <ProductsList products={products} />
    </Stack>
  );
};

export default HomeScreen;
