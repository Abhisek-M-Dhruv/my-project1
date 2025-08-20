import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import products from "../../db/db.json";
import { useState, useEffect } from "react";
import axios from "axios";

const Homecontaint = ({ cart, addToCart, updateQty }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://68a559122a3deed2960d23c4.mockapi.io/inventories"
        );
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <Typography align="center" sx={{ p: 3 }}>
        Loading...
      </Typography>
    );
  if (error)
    return (
      <Typography align="center" sx={{ p: 3, color: "red" }}>
        {error}
      </Typography>
    );

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {products.map((item) => {
        const inCart = cart[item.id];

        return (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                ":hover": { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={item.imgURL}
                alt={item.item}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {item.item}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₹{item.price}
                </Typography>
              </CardContent>
              <CardActions>
                {!inCart ? (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(item)}
                    fullWidth
                    disabled={item.currentCount <= 0}
                  >
                    {item.currentCount <= 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => updateQty(item.id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{inCart.qty}</Typography>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        if (inCart.qty < item.currentCount) {
                          updateQty(item.id, 1);
                        }
                      }}
                      disabled={inCart.qty >= item.currentCount}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                )}
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Homecontaint;
