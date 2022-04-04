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
import { useParams, useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import "./index.css";
import API from "../../api/fetch";
import config from "../../config";
import Paragraph from "antd/lib/typography/Paragraph";
const { Title, Text } = Typography;
const { Search } = Input;
const { Meta } = Card;

const data = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
  546, 983, 340, 539, 243, 226, 192,
];
const configLine = {
  height: 60,
  autoFit: false,
  data,
  smooth: true,
};

const SubDetailRestaurant = () => {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const params = useParams();
  let navigate = useNavigate();
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
  const [rst, setRst] = useState({
    address: "",
    city: {
      name: "",
    },
    city_id: 1,
    cover: {
      url: "",
    },
    created_at: "",
    id: 0,
    owner_id: 0,
    lat: 0.0,
    like_count: 0,
    lng: 0.0,
    logo: {
      url: "",
    },
    name: "",
    rating: 0,
    shipping_fee_per_km: 0.0,
    status: true,
    updated_at: "",
  });

  const [ownerRst, setOwnerRst] = useState({
    id: 12,
    created_at: "",
    updated_at: "",
    phone: "",
    last_name: "",
    first_name: "",
    status: true,
  });
  const [listFood, setListFood] = useState([]);
  const onClose = () => {
    setVisible(false);
  };

  const onShow = (food) => {
    setCurrentFood({
      id: food.id,
      created_at: food.created_at,
      updated_at: food.updated_at,
      category: {
        name: food.category ? food.category.name : "Underfine",
      },
      name: food.name,
      description: food.description,
      price: food.price,
      status: food.status,
      images: {
        url: food.images
          ? food.images.url
            ? food.images.url
            : config.image_not_found
          : config.image_not_found,
      },
    });
    setVisible(true);
  };

  const updateStatusRst = () => {
    setLoading(true);
    if (rst.id === undefined) {
      return notification["error"]({
        message: "Error server",
        description: "Invalid ID",
      });
    }
    API.put(`admin/restaurant/${rst.id}`, {
      status: !rst.status,
    })
      .then((result) => {
        notification["success"]({
          message: "Update success",
        });
        setRst({
          ...rst,
          status: !rst.status,
        });
      })
      .catch((e) => {
        console.log(e.response);
        notification["error"]({
          message: "Error server",
          description: e.response.data.message,
        });
      });
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const id = params.id;
    if (id == undefined) {
      return navigate("/rst");
    }
    await API.get(`admin/restaurant/${id}`)
      .then((result) => {
        setRst({
          address: result.data.data.address,
          city: {
            name: result.data.data.city ? result.data.data.cover.url : "",
          },
          city_id: result.data.data.city_id,
          cover: {
            url: result.data.data.cover ? result.data.data.cover.url : "",
          },
          created_at: result.data.data.created_at,
          id: result.data.data.id,
          owner_id: result.data.data.owner_id,
          lat: result.data.data.lat,
          like_count: result.data.data.like_count,
          lng: result.data.data.lng,
          logo: {
            url: result.data.data.logo ? result.data.data.logo.url : "",
          },
          name: result.data.data.name,
          rating: result.data.data.rating,
          shipping_fee_per_km: result.data.data.shipping_fee_per_km,
          status: result.data.data.status,
          updated_at: result.data.data.updated_at,
        });
        fetchOwnerRst(result.data.data.owner_id);
        fetchFoodRst(result.data.data.id);
      })
      .catch((e) => {
        console.log(e.response);
        notification["error"]({
          message: "Error server",
          description: e.response.data.message,
        });
      });
    setLoading(false);
  };

  const fetchOwnerRst = (id) => {
    if (id == undefined) {
      return navigate("/rst");
    }
    API.get(`admin/owner-rst/${id}`)
      .then((result) => {
        const owner = result.data.data;
        setOwnerRst({
          id: owner.id,
          first_name: owner.first_name,
          last_name: owner.last_name,
          phone: owner.phone,
          created_at: owner.created_at,
          updated_at: owner.updated_at,
          status: owner.status,
        });
      })
      .catch((e) => {
        console.log(e.response);
        notification["error"]({
          message: "Error server",
          description: e.response.data.message,
        });
      });
  };

  const fetchFoodRst = (id) => {
    if (id == undefined) {
      return navigate("/rst");
    }
    API.get(`admin/restaurant/${id}/food`)
      .then((result) => {
        const foods = result.data.data;
        setListFood(foods);
      })
      .catch((e) => {
        console.log(e.response);
        notification["error"]({
          message: "Error server",
          description: e.response.data.message,
        });
      });
  };

  useEffect(() => {
    document.title = "Restaurant Detail";
    fetchData();
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
            <Title keyboard>{rst.name}</Title>
            <Text level={3} strong>
              Created At {rst.created_at}
            </Text>
          </Col>
          <Col span={4}>
            {rst.status ? (
              <Button
                type="primary"
                danger
                size="large"
                style={{ float: "right" }}
                onClick={updateStatusRst}
              >
                Deactive
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                style={{ float: "right" }}
                onClick={updateStatusRst}
              >
                Active
              </Button>
            )}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Like"
                value={rst.like_count}
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
                value={rst.rating}
                valueStyle={{ color: "#3f8600" }}
                prefix={<StarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <TinyLine {...configLine} />
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
              <DescriptionItem title="Id" content={rst.id}></DescriptionItem>
              <DescriptionItem
                title="Name"
                content={rst.name}
              ></DescriptionItem>
              <DescriptionItem title="Descrription" content={rst.description} />
              <DescriptionItem title="Address" content={rst.address} />
              <DescriptionItem title="Like count" content={rst.like_count} />
              <DescriptionItem title="Rating" content={rst.rating} />
              <DescriptionItem
                title="City"
                content={rst.city ? rst.city.name : "K ro"}
              />
              <DescriptionItem title="Lat" content={rst.lat} />
              <DescriptionItem title="Long" content={rst.lng} />
              <DescriptionItem
                title="Shipping fee"
                content={rst.shipping_fee_per_km}
              />
              <DescriptionItem
                title="Status"
                content={rst.status ? "Active" : "Deactive"}
              />
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
                    src={rst.logo ? rst.logo.url : "error"}
                    fallback={config.image_not_found}
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
                    src={rst.cover ? rst.cover.url : "error"}
                    fallback={config.image_not_found}
                  />
                </Col>
              </Row>

              <Row>
                <Col span={6}>
                  <Title level={4}>Map </Title>
                </Col>
                <Col span={6}>
                  {/* <div style={{ height: "100vh", width: "100%" }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: "" }}
                      defaultZoom={11}
                    >
                      <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                      />
                    </GoogleMapReact>
                  </div> */}
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
              <DescriptionItem
                title="Id"
                content={ownerRst.id}
              ></DescriptionItem>
              <DescriptionItem
                title="First Name"
                content={ownerRst.first_name}
              ></DescriptionItem>
              <DescriptionItem title="Last Name" content={ownerRst.last_name} />
              <DescriptionItem
                title="Status"
                content={ownerRst.status ? "Active" : "Deactive"}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Phone Number"
                content={ownerRst.phone}
              ></DescriptionItem>
              <DescriptionItem title="Role" content="Owner"></DescriptionItem>
              <DescriptionItem
                title="Created at"
                content={ownerRst.created_at}
              />
              <DescriptionItem
                title="Updated at"
                content={ownerRst.updated_at}
              />
            </Col>
          </Row>
        </div>

        {/* Restaurant food */}
        <Divider orientation="left" plain>
          <h1 style={{ color: "#5AD8A6" }}>Foods Restaurant</h1>
        </Divider>

        <div style={{ textAlign: "left" }}>
          <Row gutter={[16, 16]}>
            {listFood.length == 0
              ? "Restaurant has no food yet!"
              : listFood.map((food) => {
                  return (
                    <Col span={6}>
                      <Card
                        hoverable
                        style={{ width: 300 }}
                        onClick={() => {
                          onShow(food);
                        }}
                        cover={
                          <img
                            alt="example"
                            width={300}
                            height={300}
                            src={
                              food.images
                                ? food.images.url
                                  ? food.images.url
                                  : config.image_not_found
                                : config.image_not_found
                            }
                          />
                        }
                        actions={[
                          <p>
                            <Tag color="#2db7f5">{food.price}$</Tag>
                          </p>,
                          <p>
                            {food.status ? (
                              <Tag color="#87d068">Active</Tag>
                            ) : (
                              <Tag color="#87d068">Deactive</Tag>
                            )}
                          </p>,
                          <EllipsisOutlined key="ellipsis" />,
                        ]}
                      >
                        <Meta
                          avatar={
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                          }
                          title={food.name}
                          description={
                            food.description.substring(0, 20) + "..."
                          }
                        />
                      </Card>
                    </Col>
                  );
                })}
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
              <Image
                width={360}
                src={
                  currentFood.images
                    ? currentFood.images.url
                      ? currentFood.images.url
                      : config.image_not_found
                    : config.image_not_found
                }
                style={{}}
              />
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
