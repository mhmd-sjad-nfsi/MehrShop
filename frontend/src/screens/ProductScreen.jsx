import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Image, ListGroup, ListGroupItem ,Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [product ,setProduct]= useState({});
  useEffect(()=>{
    const fetchProduct = async()=>{
      const {data}= await axios.get(`/api/products/${productId}`)
      setProduct(data)
    }
      fetchProduct()
  },[productId])

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews `}
              />
            </ListGroupItem>
            <ListGroupItem>Price : ${product.price}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
                <Row>
              <Col>Price :</Col>
              <Col>
                <strong>${product.price}</strong>
              </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
            <Row>
              <Col>Status :</Col>
              <Col>
              {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </Col>
              </Row>
            </ListGroupItem>
            <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
          </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
