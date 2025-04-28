
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  InputNumber, 
  Select, 
  Typography, 
  Space, 
  Divider,
  Rate,
  notification
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useGetCategoriesQuery, useGetProductByIdQuery, useUpdateProductMutation } from '../redux/api/productApi';
import { CategoryType, UpdateProductRequest } from '../types/product';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { toast } from 'sonner';
const { Title } = Typography;
const { TextArea } = Input;

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || '0');
  const [form] = Form.useForm();
  
  const { data: product, isLoading: isProductLoading, error: productError } = useGetProductByIdQuery(productId);
  const { data: categories = [], isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        reviews: product.reviews || []
      });
    }
  }, [product, form]);

  const handleBack = () => {
    navigate(-1);
  };

  const onFinish = async (values: UpdateProductRequest) => {
    console.log('Updated product data:', values);
    try {
      const res = await updateProduct({ id: productId, data: values }).unwrap();
      console.log(res)
      if(res){
          toast.success("success") 
      }
      notification.success({
        message: 'Success',
        description: 'Product updated successfully!',
      });
      navigate(`/products/${productId}`);
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to update product.',
      });
      console.error('Failed to update product:', err);
    }
  };

  if (isProductLoading || isCategoriesLoading) return <Loading />;
  
  if (productError || !product) {
    return <ErrorMessage message="Failed to load product details. Please try again later." />;
  }

  // Helper function to capitalize first letter safely
  const capitalizeFirstLetter = (text: string): string => {
    if (!text || typeof text !== 'string') return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Check if categories is actually an array of strings
  const renderCategories = () => {
    if (!Array.isArray(categories)) {
      console.error("Categories is not an array:", categories);
      return null;
    }

    return categories.map((category: CategoryType) => {
      // Check if category is an object with slug, name, url properties
      if (typeof category === 'object' && category !== null) {
        // If it's an object with a name property, use that
        if ('name' in category && typeof category?.name === 'string') {
          const value = 'slug' in category && typeof category.slug === 'string' ? category.slug : category.name;
          return (
            <Select.Option key={value} value={value}>
              {capitalizeFirstLetter(category.name)}
            </Select.Option>
          );
        }
        // Just log the object for debugging
        console.log("Category object:", category);
        return null;
      }
      
      // Handle string categories (as expected)
      if (typeof category === 'string') {
        return (
          <Select.Option key={category} value={category}>
            {capitalizeFirstLetter(category)}
          </Select.Option>
        );
      }
      
      return null;
    }).filter(Boolean); // Filter out null values
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          className="mr-2"
        >
          Back
        </Button>
        <Title level={2}>Edit Product</Title>
      </div>

      <Card className="shadow-md rounded-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={product}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Title level={4}>Basic Information</Title>
              
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please enter the product title' }]}
              >
                <Input placeholder="Product title" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter the product description' }]}
              >
                <TextArea rows={4} placeholder="Product description" />
              </Form.Item>

              <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: true, message: 'Please enter the brand name' }]}
              >
                <Input placeholder="Brand name" />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select a category" loading={isCategoriesLoading}>
                  {renderCategories()}
                </Select>
              </Form.Item>
            </div>

            <div className='md:mx-auto'>
              <Title level={4}>Pricing & Inventory</Title>
              
              <Form.Item
                label="Price ($)"
                name="price"
                rules={[{ required: true, message: 'Please enter the price' }]}
              >
                <InputNumber min={0} step={0.01} precision={2} className="w-full" />
              </Form.Item>

              <Form.Item
                label="Discount Percentage (%)"
                name="discountPercentage"
                rules={[{ required: true, message: 'Please enter the discount percentage' }]}
              >
                <InputNumber min={0} max={100} step={0.1} precision={1} className="w-full" />
              </Form.Item>

              <Form.Item
                label="Stock"
                name="stock"
                rules={[{ required: true, message: 'Please enter the stock amount' }]}
              >
                <InputNumber min={0} className="w-full" />
              </Form.Item>

              <Form.Item
                label="Rating"
                name="rating"
              >
                <Rate allowHalf allowClear={false} className="w-full" />
              </Form.Item>
            </div>
          </div>

          <Divider />

          <Title level={4}>Images</Title>
          
          <Form.Item
            label="Thumbnail URL"
            name="thumbnail"
            rules={[{ required: true, message: 'Please enter the thumbnail URL' }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.List name="images">
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <Space key={field.key} className="flex items-center w-full">
                    <Form.Item
                      {...field}
                      label={index === 0 ? "Image URL" : ""}
                      rules={[{ required: true, message: 'Please enter image URL or delete this field' }]}
                      className="w-full mb-0"
                    >
                      <Input placeholder="https://example.com/image.jpg" />
                    </Form.Item>
                    <Button
                      type="text"
                      className="flex items-center text-red-500 mt-6"
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(field.name)}
                    />
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  className="w-full mt-2"
                >
                  Add Image URL
                </Button>
              </div>
            )}
          </Form.List>

          <Divider />

          <Title level={4}>Reviews</Title>

          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map((field) => (
                  <Card key={field.key} className="bg-gray-50">
                    <div className="flex justify-end">
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(field.name)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        {...field}
                        label="Username"
                        name={[field.name, 'username']}
                        rules={[{ required: true, message: 'Please enter username' }]}
                      >
                        <Input placeholder="Username" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="Rating"
                        name={[field.name, 'rating']}
                        rules={[{ required: true, message: 'Please set rating' }]}
                      >
                        <Rate allowHalf />
                      </Form.Item>
                    </div>
                    <Form.Item
                      {...field}
                      label="Review Text"
                      name={[field.name, 'text']}
                      rules={[{ required: true, message: 'Please enter review text' }]}
                    >
                      <TextArea rows={2} placeholder="What did they think about the product?" />
                    </Form.Item>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add({ username: '', rating: 5, text: '' })}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Review
                </Button>
              </div>
            )}
          </Form.List>

          <Divider />

          <Form.Item>
            <Space className="flex justify-end">
              <Button onClick={handleBack}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isUpdating} className="bg-blue-500">
                Save Changes
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductEdit;
