import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function UpdateProduct() {
  const { productId } = useParams();
  const { userId } = useAuth();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/wishlist/product/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();
        setName(data.name);
        setPrice(data.price);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProductData();
  }, [productId, userId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/wishlist/${userId}/update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, price }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      navigate(`/wishlist/${userId}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Update Product</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Update Product
        </Button>
      </Form>
    </Container>
  );
}
