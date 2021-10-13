import axios from "axios";
import * as React from "react";
import {Button, ButtonGroup, Spinner, Image, Box, Flex} from "@chakra-ui/react";
import {Stack, StackDivider, StackItem} from "@chakra-ui/layout";

import buyBag from "../assets/icons/buy-blue.svg";
import ArrowRight from "../assets/icons/arrow-right.svg";
import ArrowLeft from "../assets/icons/arrow-left.svg";
import Navbar from "~/componets/Navbar";
import styles from "../App/App.module.scss";
import Card from "~/componets/Card";
import UserContext from "~/componets/Context";

import {apikey, Product, User} from "./types";

const App: React.FC = () => {
  const user = React.useContext(UserContext).state.user;
  const [products, setProducts] = React.useState<Product[]>([]);
  const [page, setPage] = React.useState<0 | 1>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selected, setSelected] = React.useState<Product["_id"] | null>(null);

  React.useEffect(() => {
    setLoading((loading) => !loading);
    axios
      .get<Product[]>("https://coding-challenge-api.aerolab.co/products", {
        headers: {
          Authorization: "Bearer " + apikey,
        },
      })
      .then(({data}) => {
        page === 0 ? setProducts(data.slice(0, 16)) : setProducts(data.slice(16, 32));
        setLoading((loading) => !loading);
      });
  }, [setPage, page]);

  return (
    <main className={styles.container}>
      <Navbar setPage={setPage} user={user} />
      <div className={styles.products}>
        {loading ? (
          <>
            {products.map((product) => (
              <Box key={product._id} onClick={() => setSelected(product._id)}>
                <Card isSelected={selected === product._id ? true : false} product={product} />
              </Box>
            ))}
            <footer>
              <Stack
                alignItems="center"
                borderBottom="1px solid gainsboro"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom="1rem"
                padding="1rem 0rem"
                width="6xl"
              >
                <StackItem>{`${products.length} of 32 products`}</StackItem>
                <StackItem className={styles.buttomButtons}>
                  {page === 0 ? (
                    <img
                      alt="flecha"
                      src={ArrowRight}
                      onClick={() => {
                        setPage(1);
                        window.scrollTo({top: 0, behavior: "smooth"});
                      }}
                    />
                  ) : (
                    <img
                      alt="flecha"
                      src={ArrowLeft}
                      onClick={() => {
                        setPage(0);
                        window.scrollTo({top: 0, behavior: "smooth"});
                      }}
                    />
                  )}
                </StackItem>
              </Stack>
            </footer>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
};

export default App;
