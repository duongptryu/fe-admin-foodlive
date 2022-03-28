import {
  Row,
  Col,
  Table,
  Button,
  Spin,
  notification,
  Typography,
  Image,
} from "antd";
import { ethers } from "ethers";
import Logo from "../../logo_real.png";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/fetch";
import config from "../../config";
import common from "../../common/common";
import abi from "../../utils/foodlive_abi.json";

const { Title, Paragraph, Text, Link } = Typography;

const PaymentScreen = () => {
  let navigate = useNavigate();
  const params = useParams();
  const orderId = params.id;

  const [orderDetail, setOrderDetail] = useState([]);
  const [order, setOrder] = useState({});
  const [orderTracking, setOrderTracking] = useState({});
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        notification["error"]({
          message: "Make sure you have metamask",
        });
        return;
      } else {
        notification["success"]({
          message: "Connected to metamask",
        });
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        notification["success"]({
          message: "Your wallet is connected",
        });
      } else {
        notification["warning"]({
          message: "Please connect your wallet to payment!",
        });
      }
    } catch (e) {
      notification["error"]({
        message: e,
      });
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        notification["error"]({
          message: "Please install metamask",
        });
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      notification["success"]({
        message: `Your account ${accounts[0]} is connected`,
      });
    } catch (error) {
      notification["error"]({
        message: error,
      });
    }
  };

  const payment = async () => {
    try {
      const { ethereum } = window;

      const orderId = params.id;
      if (!ethereum) {
        notification["error"]({
          message: "Make sure you have metamask",
        });
        return;
      }

      setLoading(true);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contractABI = abi.abi;
      const foodliveContract = new ethers.Contract(
        config.PAYMENT_ADDRESS,
        contractABI,
        signer
      );

      const options = {
        value: ethers.utils.parseEther(order.total_price_eth),
      };
      const tx = await foodliveContract.paymentOrder(orderId, options);

      notification["success"]({
        message: `Transaction in progress, transaction hash: ${tx.hash}`,
      });

      await tx.wait();

      notification["success"]({
        message: `Transaction is completed, transaction hash: ${tx.hash}`,
      });

      setLoading(false);
      navigate("/success");
    } catch (error) {
      console.log(error);
      notification["error"]({
        message: error.message,
      });
      setLoading(false);
      return;
    }
  };

  const columns = [
    {
      title: "Image",
      key: "image",
      render: (c) => {
        return (
          <Image
            width={100}
            src={
              c.food_origin.images.url
                ? c.food_origin.images.url
                : config.image_not_found
            }
          />
        );
      },
    },
    {
      title: "Food Name",
      key: "name",
      render: (c) => {
        return <Text>{c.food_origin.name}</Text>;
      },
    },
    {
      title: "Price",
      key: "price",
      render: (c) => {
        return <Text>{common.formatNumber(c.price)} VND</Text>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const fetchData = () => {
    setLoading(true);
    if (orderId == undefined) {
      return navigate("/404");
    }
    API.get(`order/crypto/${orderId}`)
      .then((result) => {
        setOrder(result.data.data.order);
        setOrderDetail(result.data.data.order_detail);
        setOrderTracking(result.data.data.order_tracking);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        return navigate("/404");
      });
  };

  useEffect(() => {
    fetchData();
    checkIfWalletIsConnected();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row style={{ paddingTop: "10%" }}>
        <Col span={12} offset={7}>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={9}>
              <div>
                <img src={Logo} />
              </div>
            </Col>
            <Col span={14}>
              <Row>
                <Title style={{ color: "#FE724C" }}>Payment by crypto </Title>
              </Row>
              <Row>
                <Col>
                  <Title style={{ color: "#FE724C" }} level={3}>
                    Order Id : {order.id}
                  </Title>
                  <Text strong>
                    Created at : {common.formatDatetime(order.created_at)}
                  </Text>
                  <br></br>
                  <Text strong>Ship to : {order.user_address_ori}</Text>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ marginBottom: "20px" }}>
            <Col span={18}>
              <Table
                dataSource={orderDetail}
                columns={columns}
                pagination={false}
                // bordered={true}
                showHeader={true}
              />
            </Col>
          </Row>

          <Row>
            <Col offset={1}>
              <Title level={5}>
                <span style={{ color: "#FE724C" }}>Ship fee:</span> 10,000 VND
              </Title>
            </Col>
          </Row>

          <Row>
            <Col offset={1}>
              <Title level={5}>
                <span style={{ color: "#FE724C" }}>Total price: </span>
                {order.total_price} VND
              </Title>
            </Col>
          </Row>

          <Row>
            <Col offset={1}>
              <Title level={5}>
                <span style={{ color: "#FE724C" }}>Total price ETH:</span>{" "}
                {order.total_price_eth} Ether
              </Title>
            </Col>
          </Row>

          <Row>
            <Col offset={7}>
              {currentAccount.length === 0 ? (
                <Button
                  type="primary"
                  danger
                  size="large"
                  onClick={connectWallet}
                >
                  Connect your wallet
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  onClick={payment}
                  color="#FE724C"
                  style={{ backgroundColor: "#FE724C", borderColor: "#FE724C" }}
                >
                  Payment
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};

export default PaymentScreen;
