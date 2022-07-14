import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
  Button,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { fCurrency } from "../utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";
import { getSingleProduct } from "../redux/reducers/productReducer";
import { addProductToCart, createCart } from "../redux/reducers/cartReducer";
import useAuth from "../hooks/useAuth";

const DetailPage = () => {
  const product = useSelector((state) => state.product.singleProduct);
  const isLoading = useSelector((state) => state.product.loading);
  const isError = useSelector((state) => state.product.error);
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  console.log(params);
  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [productId]);

  const addToCart = (productId) => {
    dispatch(addProductToCart({ productId, qty: 1, price: product.price }));
  };

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Vechai Store
        </Link>
        <Typography color="text.primary">{product?.name}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {isError ? (
              <Alert severity="error">{isError}</Alert>
            ) : (
              <>
                {product && (
                  <Card>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                width: 1,
                                height: 1,
                              }}
                              src={product.cover}
                              alt="product"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            mt: 2,
                            mb: 1,
                            display: "block",
                            textTransform: "uppercase",
                            color:
                              product.status === "sale"
                                ? "error.main"
                                : "info.main",
                          }}
                        >
                          {product.status}
                        </Typography>
                        <Typography variant="h5" paragraph>
                          {product.name}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Rating
                            value={product.totalRating}
                            precision={0.1}
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            ({product.totalReview} reviews)
                          </Typography>
                        </Stack>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                          <Box
                            component="span"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "line-through",
                            }}
                          >
                            {product.priceSale && fCurrency(product.priceSale)}
                          </Box>
                          &nbsp;{fCurrency(product.price)}
                        </Typography>

                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box>
                          <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            children={product.description}
                          />
                        </Box>
                        <Button
                          variant="outlined"
                          sx={{ width: "fit-content" }}
                          onClick={() => addToCart(product._id)}
                        >
                          Add to Cart
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!product && (
                  <Typography variant="h6">404 Product not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default DetailPage;
