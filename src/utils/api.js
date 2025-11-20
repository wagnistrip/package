import { Box, Skeleton, Grid } from "@mui/material";
export const applySortFilter = (data, option) => {
  if (!Array.isArray(data)) return [];

  const sorted = [...data];

  switch (option) {
    // ✅ Sorting by price
    case "Price - Low to High":
      return sorted.sort((a, b) => parseFloat(a.base_price) - parseFloat(b.base_price));

    case "Price - High to Low":
      return sorted.sort((a, b) => parseFloat(b.base_price) - parseFloat(a.base_price));

    // ✅ Sorting by duration
    case "Duration - Low to High":
      return sorted.sort((a, b) => (a.duration_days || 0) - (b.duration_days || 0));

    case "Duration - High to Low":
      return sorted.sort((a, b) => (b.duration_days || 0) - (a.duration_days || 0));

    // ✅ Sorting by rating (for future use)
    case "Rating - High to Low":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    case "Rating - Low to High":
      return sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));

    // ✅ Filtering examples (can add many more)
    case "Budget < 20000":
      return sorted.filter((item) => parseFloat(item.base_price) < 20000);

    case "5 Star Only":
      return sorted.filter((item) => item.hotel_category === "5 Star");

    // ✅ Default: “Popular” or no sorting
    default:
      return sorted;
  }
};

// utils/guestUtils.js

export const generateInitialGuestData = (packagedata = []) => {
  return packagedata.map((room) => ({
    adults: Array.from({ length: room.adults || 0 }, () => ({
      title: "",
      firstName: "",
      lastName: "",
    })),
    children: Array.from({ length: room.children || 0 }, () => ({
      title: "",
      firstName: "",
      lastName: "",
    })),
  }));
};


export default function PackageDetailsSkeleton() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Top image skeleton */}
      <Skeleton
        variant="rectangular"
        height={350}
        sx={{ borderRadius: 3, mb: 3 }}
      />

      <Grid container spacing={3}>
        {/* Left side content */}
        <Grid item xs={12} md={8}>
          <Skeleton width="70%" height={40} />
          <Skeleton width="50%" height={25} sx={{ mt: 2 }} />
          <Skeleton width="40%" height={25} sx={{ mt: 1 }} />

          <Skeleton width="100%" height={2} sx={{ mt: 3, mb: 3 }} />

          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid item key={i}>
                <Skeleton width={120} height={40} />
              </Grid>
            ))}
          </Grid>

          <Skeleton height={200} sx={{ mt: 3, borderRadius: 2 }} />
        </Grid>

        {/* Right side booking card */}
        <Grid item xs={12} md={4}>
          <Skeleton height={40} width="60%" sx={{ mb: 2 }} />

          <Skeleton height={80} sx={{ borderRadius: 2, mb: 2 }} />
          <Skeleton height={80} sx={{ borderRadius: 2, mb: 2 }} />
          <Skeleton height={80} sx={{ borderRadius: 2, mb: 3 }} />

          <Skeleton height={50} sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
    </Box>
  );
}
