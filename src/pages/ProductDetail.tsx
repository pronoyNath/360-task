import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Descriptions,
  Image,
  Rate,
  Tag,
  Divider,
  Button,
  Carousel,
} from "antd";
import { EditOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { useGetProductByIdQuery } from "../redux/api/productApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { CategoryType } from "../types/product";

const { Title, Text, Paragraph } = Typography;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || "0");

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  const handleEdit = () => {
    navigate(`/products/${productId}/edit`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Helper function to handle category display
  const renderCategory = (category: CategoryType) => {
    console.log(category)
    if (typeof category === "string") {
      return category;
    }
    if (typeof category === "object" && category !== null) {
      return category.name || "Unknown Category";
    }
    return "Unknown Category";
  };

  if (isLoading) return <Loading />;

  if (error || !product) {
    return (
      <ErrorMessage message="Failed to load product details. Please try again later." />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          className="mr-2"
        >
          Back to Products
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="shadow-md rounded-lg overflow-hidden mb-6">
            <div className="mb-6">
              <Carousel
                autoplay
                className="mb-4 rounded-lg overflow-hidden bg-gray-100"
              >
                {product.images.map((image, index) => (
                  <div key={index} className="h-64">
                    <Image
                      src={image}
                      alt={`${product.title} - image ${index + 1}`}
                      className="w-full h-full object-cover"
                      fallback="https://via.placeholder.com/400x300"
                      preview={{
                        mask: (
                          <div className="flex items-center justify-center">
                            <Text className="text-white">View</Text>
                          </div>
                        ),
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="flex justify-between items-center">
              <Text type="secondary" className="text-gray-100">Click on Image to View Clearly</Text>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
                className="bg-blue-500"
              >
                Edit
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-md rounded-lg">
            <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
              <div>
                <Title level={2} className="mb-1">
                  {product.title}
                </Title>
                <Tag color="blue" className="mb-3 py-1 px-2 capitalize">
                  {renderCategory(product.category)}
                </Tag>
                <div className="flex items-center mb-4">
                  <Rate allowHalf defaultValue={product.rating} disabled />
                  <Text className="ml-2">({product.rating})</Text>
                </div>
              </div>
              <div className="text-right">
                <Title level={2} className="text-red-500 mb-1">
                  ${product.price.toFixed(2)}
                </Title>
                {product.discountPercentage > 0 && (
                  <Tag color="green">{product.discountPercentage}% OFF</Tag>
                )}
              </div>
            </div>

            <Divider />

            <Descriptions
              title="Product Information"
              layout="vertical"
              bordered
            >
              <Descriptions.Item label="Brand" span={3}>
                {product.brand}
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={3}>
                <Paragraph>{product.description}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Stock">
                <Tag
                  color={
                    product.stock > 10
                      ? "green"
                      : product.stock > 0
                      ? "orange"
                      : "red"
                  }
                >
                  {product.stock} in stock
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Discount">
                {product.discountPercentage}%
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {renderCategory(product.category)}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div>
              <Title level={4}>Reviews ( {product?.reviews?.length} )</Title>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((review, index) => (
                    <Card key={index} size="small" className="bg-gray-50">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                          <div className="text-center md:text-left flex flex-col gap-1">
                            <Text strong>{review?.reviewerName}</Text>
                            <Rate
                              disabled
                              defaultValue={review?.rating}
                              className="text-sm"
                            />
                          </div>
                          <div className="text-center md:text-right flex flex-col gap-1">
                            <Text type="secondary" className="text-xs">
                              {format(new Date(review?.date), "PPpp")}
                            </Text>
                            <Text>{review?.comment}</Text>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Text type="secondary">No reviews available</Text>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
