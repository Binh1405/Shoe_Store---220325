import { Box, Button, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

export const FILTER_GENDER_OPTIONS = ["men", "women", "kids"];

export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "shoe",
  "bike",
  "tower",
  "cheese",
  "shirt",
];

export const FILTER_PRICE_OPTIONS = [
  { price: 0 - 100, label: "Below $100" },
  { price: 100 - 400, label: "Between $100 - $400" },
  { price: 400, label: "Above $400" },
];

function ProductFilter({ resetFilter }) {
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Gender
        </Typography>
        <FMultiCheckbox
          name="gender"
          options={FILTER_GENDER_OPTIONS}
          sx={{ width: 1 }}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Category
        </Typography>
        <FRadioGroup
          name="category"
          options={FILTER_CATEGORY_OPTIONS}
          row={false}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Price
        </Typography>
        <FRadioGroup
          name="priceRange"
          options={FILTER_PRICE_OPTIONS.map((item) => item.price)}
          getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
        />
      </Stack>

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;
