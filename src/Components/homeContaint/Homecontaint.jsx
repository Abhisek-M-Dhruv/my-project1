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
// import { Add, Remove } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import products from "../../db/db.json";

// const products = [
//   {
//     id: 1,
//     title: "8 Piece Fried Chicken Bucket",
//     imgURL:
//       "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/items/xl/A-33785-0.jpg?ver=14.71",
//     mrp: 549,
//     detail:
//       "Eight pieces of KFC's Original Recipe fried chicken, served in a bucket.",
//   },
//   {
//     id: 2,
//     title: "Spicy Chicken Sandwich",
//     imgURL:
//       "https://images.ctfassets.net/wtodlh47qxpt/4AcPJzGNNxfXiF1rWvlydj/2a8548a717ff678fbfb0d881b7367ba8/KFC-Gold-Burger-White-Category-23MAY_4.jpg?fm=webp&fit=fill",
//     mrp: 179,
//     detail:
//       "Crispy spicy chicken fillet with mayonnaise and lettuce, served on a toasted bun.",
//   },
//   {
//     id: 3,
//     title: "Pepsi",
//     imgURL:
//       "https://images.ctfassets.net/wtodlh47qxpt/45FYhHRpRebHUC0wNGpTcU/810af36ba1125bc6e36e366f8b52ee0b/D-K485-prod?h=600&w=800&fm=webp&fit=fill",
//     mrp: 60,
//     detail: "Chilled carbonated Pepsi soft drink.",
//   },
// ];

const Homecontaint = ({ cart, addToCart, updateQty }) => {
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
                alt={item.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    height: 50,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.detail}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ₹{item.mrp}
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
                  >
                    Add to Cart
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
                      onClick={() => updateQty(item.id, 1)}
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
