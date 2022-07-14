import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../utils";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/product/${product._id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={product.cover}
          alt="green iguana"
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography gutterBottom variant="body1" component="div" noWrap>
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Category: {product.category}</Typography>
              <Typography>Gender: {product.gender}</Typography>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            Price:{" "}
            <Typography variant="subtitle1">
              {fCurrency(product.price)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
