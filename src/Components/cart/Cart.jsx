import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Card,
  CardMedia,
  TextField,
  MenuItem,
  Paper,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import { Hourglass } from "react-loader-spinner";
import LoadingOverlay from "../Loader/LoadingOverlay";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, updateQty, setCart }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [users, setUser] = useState([]);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("Abhi");
  const [creditCard, setCreditCard] = useState("");

  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const getCartProducts = () => {
    return items.flatMap((item) => Array(item.qty).fill(item.id));
  };

  useEffect(() => {
    if (items.length !== 0) {
      const fetchUsers = async () => {
        try {
          const res = await axios.get(
            "https://68a559122a3deed2960d23c4.mockapi.io/users"
          );
          setUser(res.data);
        } catch (err) {
          setError("Failed to load user");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, []);

  const handlePlaceOrder = () => {
    const cartProducts = getCartProducts();
    const obj = {
      userId: users[0].id,
      creditCard: creditCard,
      address: "Street Pune",
      cartProducts,
      price: total,
    };
    console.log("API Call", obj);
    setLoading(true); // show spinner
    // simulate API call
    setTimeout(() => {
      setLoading(false); // hide spinner after done
      alert("Order placed successfully!");
      setCart({}); // Clear the cart here
      navigate("/"); // navigate back to menu
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">Your cart is empty 🛒</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            variant="outlined"
            component={Link}
            to="/"
            startIcon={<KeyboardBackspaceIcon />}
          >
            Back To Menu
          </Button>
        </Box>
      </Box>
    );
  }

  //  Check if any item exceeds stock
  const hasStockIssue = items.some((item) => item.qty > item.currentCount);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {/* Left: Cart Details */}
        <Grid item size={8}>
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Your Cart
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                component={Link}
                to="/"
                startIcon={<KeyboardBackspaceIcon />}
              >
                Menu
              </Button>
            </Box>
          </div>

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
                alt={item.item}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
              <Box sx={{ flex: 1, ml: 2 }}>
                <Typography variant="subtitle1">{item.item}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                </Typography>
                <Typography variant="caption" color="error">
                  {item.qty > item.currentCount
                    ? `Only ${item.currentCount} in stock`
                    : ""}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => updateQty(item.id, -1)}
                  color="primary"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.qty}</Typography>
                <IconButton
                  onClick={() => {
                    if (item.qty < item.currentCount) {
                      updateQty(item.id, 1);
                    }
                  }}
                  color="primary"
                  disabled={item.qty >= item.currentCount}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Card>
          ))}

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total: ₹{total}</Typography>
        </Grid>

        {/* Right: User Details */}
        <Grid item size={4}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <label htmlFor="userName">Name</label>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              read
              value={users[0]?.name}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
              }}
            />
            <label htmlFor="creditCard">Credit Card</label>

            <TextField
              select
              fullWidth
              sx={{ mb: 2 }}
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
            >
              <MenuItem value="4111-1111-1111-1111">
                4111-1111-1111-1111
              </MenuItem>
              <MenuItem value="5500-0000-0000-0004">
                5500-0000-0000-0004
              </MenuItem>
              <MenuItem value="3400-0000-0000-009">3400-0000-0000-009</MenuItem>
            </TextField>

            <LoadingOverlay loading={loading} />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
