import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
};

const buildProductFilter = ({
  search = "",
  category = "",
  brand = "",
  minPrice = "",
  maxPrice = "",
} = {}) => {
  const filter = {};
  const trimmedSearch = search.trim();
  const minimumPrice = toNumber(minPrice);
  const maximumPrice = toNumber(maxPrice);

  if (trimmedSearch) {
    filter.$or = [
      { name: { $regex: escapeRegex(trimmedSearch), $options: "i" } },
      { productName: { $regex: escapeRegex(trimmedSearch), $options: "i" } },
      { title: { $regex: escapeRegex(trimmedSearch), $options: "i" } },
      { category: { $regex: escapeRegex(trimmedSearch), $options: "i" } },
      { brand: { $regex: escapeRegex(trimmedSearch), $options: "i" } },
      { description: { $regex: escapeRegex(trimmedSearch), $options: "i" } },
    ];
  }

  if (category) {
    filter.category = { $regex: `^${escapeRegex(category)}$`, $options: "i" };
  }

  if (brand) {
    filter.brand = { $regex: `^${escapeRegex(brand)}$`, $options: "i" };
  }

  if (minimumPrice !== null || maximumPrice !== null) {
    filter.price = {};

    if (minimumPrice !== null) {
      filter.price.$gte = minimumPrice;
    }

    if (maximumPrice !== null) {
      filter.price.$lte = maximumPrice;
    }
  }

  return filter;
};

const serializeProduct = (product) => ({
  ...product,
  _id: product._id.toString(),
  createdAt: product.createdAt?.toISOString?.() || product.createdAt,
  updatedAt: product.updatedAt?.toISOString?.() || product.updatedAt,
});

export const getProducts = async (options = {}) => {
  const db = await connectDB();
  const productCollection = await db.collection("products");
  const filter = buildProductFilter(options);
  const sort =
    options.sort === "best-selling"
      ? {
          bestSelling: -1,
          isBestSelling: -1,
          totalSold: -1,
          sold: -1,
          salesCount: -1,
          createdAt: -1,
        }
      : { createdAt: -1, _id: -1 };

  const products = await productCollection.find(filter).sort(sort).toArray();
  return products.map(serializeProduct);
};

export const getProductFilters = async () => {
  const db = await connectDB();
  const productCollection = await db.collection("products");
  const [categories, brands, priceStats] = await Promise.all([
    productCollection
      .aggregate([
        { $match: { category: { $nin: [null, ""] } } },
        { $group: { _id: "$category" } },
        { $sort: { _id: 1 } },
      ])
      .toArray(),
    productCollection
      .aggregate([
        { $match: { brand: { $nin: [null, ""] } } },
        { $group: { _id: "$brand" } },
        { $sort: { _id: 1 } },
      ])
      .toArray(),
    productCollection
      .aggregate([
        {
          $group: {
            _id: null,
            min: { $min: "$price" },
            max: { $max: "$price" },
          },
        },
      ])
      .toArray(),
  ]);

  return {
    categories: categories.map((item) => item._id),
    brands: brands.map((item) => item._id),
    minPrice: Number(priceStats[0]?.min || 0),
    maxPrice: Number(priceStats[0]?.max || 0),
  };
};

// get single product by id
export const getProductById = async (id) => {
  const db = await connectDB();
  const productCollection = await db.collection("products");
  const product = await productCollection.findOne({ _id: new ObjectId(id) });
  if (!product) return null;
  return serializeProduct(product);
};
