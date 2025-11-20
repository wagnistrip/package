import React from "react";
import { Box, Card, CardContent, Skeleton, Grid, Button } from "@mui/material";

const Skelton = () => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Image skeleton */}
      <Skeleton variant="rectangular" height={200} width="100%" animation="wave" />

      <CardContent>
        {/* Title */}
        <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />

        {/* Subtitle lines */}
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />

        {/* Bullet points */}
        <Box sx={{ mt: 2 }}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="text" width={`${70 - i * 10}%`} height={18} />
          ))}
        </Box>

        {/* Price and Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Skeleton variant="text" width="30%" height={25} />
          <Skeleton variant="rectangular" width={100} height={35} sx={{ borderRadius: 1 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Skelton;
