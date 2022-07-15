import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { addOneProduct, getOwnCart, removeSingleProduct, removeWholeProductFromCart } from "../redux/reducers/cartReducer";
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
  const removeWholeProduct = (productId) => {
    dispatch(removeWholeProductFromCart(productId));
  };
  const addOne = (productId) => {
    dispatch(addOneProduct({productId, qty:1}))
  }
  const subOne = (productId) => {
    dispatch(removeSingleProduct(productId));
  }
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
              sx={{ width: "15rem", height: "20rem", marginBottom: "2rem" }}
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
                  <Grid container sx={{display: "flex", alignItems: "center"}}>
                  <Grid item xs={6}>
                  <Typography gutterBottom variant="body1" component="div">
                    Quantity: {`${product.qty}`}
                    </Typography>
                    </Grid>
                    <Grid item sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center", position: "relative", bottom: "4px"}} xs={4}>
                      <Grid item xs={1}>
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{borderRadius: "50%", width: "1.5rem", height: "1.5rem"}}
                        onClick={()=>addOne(product.productId._id)}>
                    <Button sx={{color: "success.darker"}}>
                    +
                  </Button>
                  </IconButton>
                  </Grid>
                  <Grid item xs={1}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{borderRadius: "50%", width: "1.5rem", height: "1.5rem" }}
                    onClick={()=>subOne(product.productId._id)}
          >
                  <Button sx={{color: "success.darker"}} >
                    -
                  </Button>
                  </IconButton>
                  </Grid>
                  </Grid>
                  </Grid>
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
                    onClick={() => removeWholeProduct(product.productId._id)}
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
