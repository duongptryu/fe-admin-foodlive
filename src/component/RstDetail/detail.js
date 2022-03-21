import {
  Table,
  Space,
  Tag,
  Row,
  Col,
  Typography,
  Input,
  notification,
  Spin,
  Button,
  Drawer,
  Card,
  Statistic,
  Divider,
  Image,
  Avatar,
} from "antd";
import { TinyLine } from "@ant-design/plots";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  MoneyCollectOutlined,
  LikeOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./index.css";
import API from "../../api/fetch";
import Paragraph from "antd/lib/typography/Paragraph";
const { Title, Text } = Typography;
const { Search } = Input;
const { Meta } = Card;

const data = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
  546, 983, 340, 539, 243, 226, 192,
];
const config = {
  height: 60,
  autoFit: false,
  data,
  smooth: true,
};

const SubDetailRestaurant = () => {
  const [dataChart, setDataChart] = useState([]);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentFood, setCurrentFood] = useState({
    id: 0,
    created_at: "created_at",
    updated_at: "updated_at",
    category: {
      name: "name category",
    },
    name: "name food",
    description: "description food",
    price: 10,
    status: true,
    images: {
      url: "https://joeschmoe.io/api/v1/random",
    },
  });
  const onClose = () => {
    setVisible(false);
  };

  const onShow = () => {
    setVisible(true);
  };

  useEffect(() => {
    // fetchData();
  }, []);

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">
        {" "}
        <b>{title}:</b>
      </p>
      {content}
    </div>
  );

  return (
    <>
      <Spin tip="Loading..." spinning={loading}>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={20} push={2}>
            <Title keyboard>Name restaurant</Title>
            <Text level={3} strong>
              Created At
            </Text>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              danger
              size="large"
              style={{ float: "right" }}
            >
              Deactive
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Like"
                value={1128}
                prefix={<LikeOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Order"
                value={10}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Rating"
                value={4.2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<StarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <TinyLine {...config} />
            </Card>
          </Col>
        </Row>

        {/* Restaurant detail */}
        <Divider orientation="left" plain>
          <h1 style={{ color: "#5AD8A6" }}>Restaurant Information</h1>
        </Divider>

        <div style={{ textAlign: "left" }}>
          <Row justify="start">
            <Col span={12}>
              <DescriptionItem title="Id" content="10"></DescriptionItem>
              <DescriptionItem title="Name" content="asdsad"></DescriptionItem>
              <DescriptionItem title="Descrription" content="Coding" />
              <DescriptionItem title="Address" content="Coding" />
              <DescriptionItem title="Like count" content="Coding" />
              <DescriptionItem title="Rating" content="Coding" />
              <DescriptionItem title="City" content="Coding" />
              <DescriptionItem title="Lat" content="Coding" />
              <DescriptionItem title="Long" content="Coding" />
              <DescriptionItem title="Shipping fee" content="Coding" />
              <DescriptionItem title="Status" content="Coding" />
            </Col>
            <Col span={12}>
              <Row style={{ marginBottom: "10px" }}>
                <Col span={6}>
                  <Title level={4}>Logo </Title>
                </Col>
                <Col span={6}>
                  <Image
                    width={200}
                    height={200}
                    src="error"
                    fallback="data:image/png;base64,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"
                  />
                </Col>
              </Row>

              <Row>
                <Col span={6}>
                  <Title level={4}>Cover </Title>
                </Col>
                <Col span={6}>
                  <Image
                    width={200}
                    height={200}
                    src="error"
                    fallback="data:image/png;base64,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"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* Owner Restaurant detail */}
        <Divider orientation="left" plain>
          <h1 style={{ color: "#5AD8A6" }}>Owner Restaurant Information</h1>
        </Divider>

        <div style={{ textAlign: "left" }}>
          <Row justify="start">
            <Col span={12}>
              <DescriptionItem title="Id" content="10"></DescriptionItem>
              <DescriptionItem
                title="First Name"
                content="asdsad"
              ></DescriptionItem>
              <DescriptionItem title="Last Name" content="Coding" />
              <DescriptionItem title="Status" content="Coding" />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Phone Number"
                content="10"
              ></DescriptionItem>
              <DescriptionItem title="Role" content="asdsad"></DescriptionItem>
              <DescriptionItem title="Created at" content="Coding" />
              <DescriptionItem title="Updated at" content="Coding" />
            </Col>
          </Row>
        </div>

        {/* Restaurant food */}
        <Divider orientation="left" plain>
          <h1 style={{ color: "#5AD8A6" }}>Foods Restaurant</h1>
        </Divider>

        <div style={{ textAlign: "left" }}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                onClick={() => {
                  setVisible(true);
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <p>Food price</p>,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Food Name"
                  description="Food description"
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                onClick={() => {
                  setVisible(true);
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <p>Food price</p>,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Food Name"
                  description="Food description"
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                onClick={() => {
                  setVisible(true);
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <p>Food price</p>,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Food Name"
                  description="Food description"
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                onClick={() => {
                  setVisible(true);
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <p>Food price</p>,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Food Name"
                  description="Food description"
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                onClick={() => {
                  setVisible(true);
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <p>Food price</p>,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Food Name"
                  description="Food description"
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                onClick={() => {
                  setVisible(true);
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <p>Food price</p>,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Food Name"
                  description="Food description"
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                onClick={() => {
                  setVisible(true);
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <p>Food price</p>,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Food Name"
                  description="Food description"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                onClick={() => {
                  setVisible(true);
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <p>Food price</p>,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Food Name"
                  description="Food description"
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* //Detail */}
        <Drawer
          title="Food detail"
          width={736}
          placement="right"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Divider orientation="left" plain>
            <h3 style={{ color: "#5AD8A6" }}>Image</h3>
          </Divider>
          <Row>
            <Col span={24}>
              <Image width={360} src={currentFood.images.url} style={{}} />
            </Col>
          </Row>
          <Divider orientation="left" plain>
            <h3 style={{ color: "#5AD8A6" }}>Information</h3>
          </Divider>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>ID: </Text> <Text>{currentFood.id}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Name: </Text> <Text>{currentFood.name}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Description: </Text>
              <Text>{currentFood.description}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Category: </Text>
              <Text>{currentFood.category.name}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Created At: </Text>
              <Text>{currentFood.created_at}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Updated At: </Text>
              <Text>{currentFood.updated_at}</Text>
            </Col>
          </Row>
        </Drawer>
      </Spin>
    </>
  );
};

export default SubDetailRestaurant;
