// src/components/Cart.jsx
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const Cart = ({ cart, updateQty }) => {
  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.mrp * item.qty, 0);

  if (items.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">Your cart is empty 🛒</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Your Cart
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {items.map((item) => (
        <Card
          key={item.id}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            p: 1,
            boxShadow: 2,
          }}
        >
          <CardMedia
            component="img"
            image={item.imgURL}
            alt={item.title}
            sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 2 }}
          />
          <Box sx={{ flex: 1, ml: 2 }}>
            <Typography variant="subtitle1">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              ₹{item.mrp} × {item.qty} = ₹{item.mrp * item.qty}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => updateQty(item.id, -1)} color="primary">
              <RemoveIcon />
            </IconButton>
            <Typography>{item.qty}</Typography>
            <IconButton onClick={() => updateQty(item.id, 1)} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
        </Card>
      ))}

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Total: ₹{total}</Typography>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Place the order
      </Button>
    </Box>
  );
};

export default Cart;
