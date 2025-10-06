# API Response Example

## GET /api/products

The application now expects to receive product data from your backend API at the endpoint `GET /api/products`.

### Expected Response Format

```json
[
  {
    "id": 1,
    "name": "Engagement Ring 1",
    "price": 2999,
    "originalPrice": 3499,
    "rating": 4.9,
    "popularityScore": 0.85,
    "weight": 2.1,
    "images": [
      "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-Y.jpg?v=1696588368",
      "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-R.jpg?v=1696588406",
      "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-W.jpg?v=1696588402"
    ],
    "colors": [
      { "name": "Yellow Gold", "value": "#E6CA97" },
      { "name": "Rose Gold", "value": "#E1A4A9" },
      { "name": "White Gold", "value": "#D9D9D9" }
    ]
  }
]
```

### Required Fields

- **id**: Unique identifier for the product
- **name**: Product display name
- **price**: Current price
- **rating**: Product rating (0-5)
- **images**: Array of image URLs (first image for Yellow Gold, second for Rose Gold, third for White Gold)
- **colors**: Array of color objects with name and hex value

### Optional Fields

- **originalPrice**: Original price (for displaying discounts)
- **popularityScore**: Popularity score (0-1)
- **weight**: Product weight in grams

### Filtering Support

The API should support filtering via query parameters:

- `GET /api/products?minPrice=1000&maxPrice=5000`
- `GET /api/products?minPopularity=4.5`

### Configuration

Update your environment variables:
- `REACT_APP_API_URL`: Your backend API base URL (default: http://localhost:3000/api)

### Error Handling

If the API is unavailable, the application will display an error message with a retry button.