import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

export default function Start() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/allusers/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error: {error.message}</Alert>;
  }

  return (
    <Container>
      <h1 className="my-4">Lista de usuarios</h1>
      <Row>
        {users.length > 0 ? (
          users.map((user) => (
            <Col md={4} key={user._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Link
                    to={`/wishlist/${user._id}`}
                    className="btn btn-primary"
                  >
                    Go to user
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Cargando usuarios...</p>
        )}
      </Row>
    </Container>
  );
}
