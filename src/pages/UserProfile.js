import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistError, setWishlistError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const authUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlistData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/wishlist/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        setWishlistError(error);
      } finally {
        setWishlistLoading(false);
      }
    };

    fetchUserData();
    fetchWishlistData();
  }, [userId, token]);

  const handleDelete = async (productId) => {
    if (!productId) {
      console.error("Product ID is undefined");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/wishlist/${userId}/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setWishlist(wishlist.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = (productId) => {
    if (!productId) {
      console.error("Product ID is undefined");
      return;
    }
    navigate(`/update/${productId}`);
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error loading user profile: {error.message}
      </Alert>
    );
  }

  return (
    <div>
      {authUserId !== userId ? (
        <section>
          <h2>¡Hola!</h2>
          <p>
            Me llamo {user.name} ¡y me encantaría que me comprases un detallito!
          </p>
        </section>
      ) : (
        <section>
          <h2>Hola, {user.name}</h2>
          <p>Esta es tu lista de deseos:</p>
        </section>
      )}

      {wishlistLoading ? (
        <Spinner animation="border" />
      ) : wishlistError ? (
        <Alert variant="danger">
          Error loading wishlist: {wishlistError.message}
        </Alert>
      ) : wishlist.length > 0 ? (
        <div className="row">
          {wishlist.map((item) => (
            <div className="col-md-4" key={item._id}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Card.Text>ID del producto: {item._id}</Card.Text>
                  {authUserId === userId && (
                    <div>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleUpdate(item._id)}
                        className="ml-2"
                      >
                        Update
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p>¡Vaya! No hay nada en la lista de deseos...</p>
      )}
    </div>
  );
}
