import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { getOwnCart, removeSingleProduct } from "../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const products = useSelector((state) => state.cart.cartProducts);
  console.log("products", products);
  const isLoading = useSelector((state) => state.cart.loading);
  const totalPrice = useSelector((state) => state.cart.total);
  const navigate = useNavigate();
  const handleClickProduct = (productId) => {
    navigate(`/product/${productId}`);
  };
  const dispatch = useDispatch();
  const removeProduct = (productId) => {
    dispatch(removeSingleProduct(productId));
  };
  // const removeCart = () => {
  //   dispatch(removeSingleCart(owner._id));
  // };
  useEffect(() => {
    dispatch(getOwnCart());
  }, [dispatch]);
  return (
    <Container>
      <Typography variant="h6" sx={{ textAlign: "center" }} m={3}>
        Your card. Total price: {totalPrice}$
      </Typography>
      {isLoading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap={"wrap"}
        >
          {products?.map((product) => (
            <Card
              key={product._id}
              sx={{ width: "12rem", height: "18rem", marginBottom: "2rem" }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${product?.productId?.cover}`}
                  alt={`${product?.productId?.name}`}
                  onClick={() => handleClickProduct(product.productId._id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Name: {`${product?.productId?.name}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    Price: {`${product?.productId?.price}$`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    Quantity: {`${product.qty}`}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "secondary.light",
                      color: "secondary.contrastText",
                      padding: "0",
                      minWidth: "1.5rem",
                    }}
                    size="small"
                    onClick={() => removeProduct(product.productId._id)}
                  >
                    X
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default CartPage;
