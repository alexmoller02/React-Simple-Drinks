import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import './styles.css';

const DrinkCard = ({ id, drink, image }) => {
  const navigate = useNavigate(); //USed to navigate user with react-router-dom

  return (
    <Card className="drink-card" onClick={() => navigate(`/drinks/${id}`)} component="li">
      <div className="drink-card-image">
        <CardMedia component="img" height="200" alt={drink} image={image} />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Typography>{drink}</Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DrinkCard;
