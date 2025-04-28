import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Card, Button, Input, Rate, Tag, Typography, Image, TablePaginationConfig } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ExternalLink } from "lucide-react";
import { useGetProductsQuery } from "../redux/api/productApi";
import { Product } from "../types/product";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

const { Title, Text } = Typography;

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { data, error, isLoading, isFetching } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  const handleViewDetails = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleTableChange = (pagination:TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  const filteredData = data?.products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category.toLowerCase().includes(searchText.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text: string, record: Product) => (
        <div className="flex flex-col lg:flex-row items-center space-x-3">
          <Image
            src={record.thumbnail}
            alt={record.title}
            width={80}
            height={80}
            className="object-cover rounded-md"
            placeholder={
              <div className="bg-gray-200 rounded-md w-[60px] h-[60px] animate-pulse"></div>
            }
            fallback="https://via.placeholder.com/60"
          />
          <div className="flex flex-col">
            <Text strong className="line-clamp-1">
              {record.title}
            </Text>
            <Text type="secondary" className="text-xs">
              {record.brand}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => (
        <Tag color="blue" className="py-1 px-2 capitalize">
          {category}
        </Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number, record: Product) => (
        <div>
          <Text strong>${price.toFixed(2)}</Text>
          {record.discountPercentage > 0 && (
            <div>
              <Tag color="green" className="mt-1">
                {record.discountPercentage}% off
              </Tag>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => (
        <Tag color={stock > 10 ? "green" : stock > 0 ? "orange" : "red"}>
          {stock} in stock
        </Tag>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="flex flex-col lg:flex-row items-center">
          <Rate allowHalf defaultValue={rating} disabled className="text-sm" />
          <Text className="ml-2">{rating}</Text>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Product) => (
        <Button
          type="primary"
          onClick={() => handleViewDetails(record.id)}
          className="bg-blue-500"
        >
          Details
          <ExternalLink size={20} strokeWidth={1.25} />
        </Button>
      ),
    },
  ];

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <ErrorMessage message="Failed to load products. Please try again later." />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <Title level={2}>Products</Title>
        <Input
          prefix={<SearchOutlined className="site-form-item-icon" />}
          placeholder="Search products"
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Card className="shadow-md rounded-lg overflow-x-auto">
        <Table
          dataSource={filteredData || []}
          columns={columns}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.total || 0,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          onChange={handleTableChange}
          loading={isFetching}
          className="product-table"
        />
      </Card>
    </div>
  );
};

export default ProductList;
