import { Row, Col, Table, Button, Spin, notification, Typography } from "antd";
import { ethers } from "ethers";
import Logo from "../../logo_real.png";
import { useState, useEffect } from "react";

const { Title, Paragraph, Text, Link } = Typography;

const PaymentScreen = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const recipient = "0x1dC78397e67a877d7490c0009CB4A43937053e4C";

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

      if (!ethereum) {
        notification["error"]({
          message: "Make sure you have metamask",
        });
        return;
      }

      setLoading(true);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(recipient);
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther("0.02"),
        chainId: 4,
      });

      notification["success"]({
        message: `Transaction in progress, transaction hash: ${tx.hash}`,
      });

      await tx.wait();

      notification["success"]({
        message: `Transaction is completed, transaction hash: ${tx.hash}`,
      });

      setLoading(false);
    } catch (error) {
      notification["error"]({
        message: error,
      });
      setLoading(false);
      return;
    }
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      price: 32,
      quantity: 1,
    },
    {
      key: "2",
      name: "John",
      price: 42,
      quantity: 2,
    },
  ];

  const columns = [
    {
      title: "Food Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <Spin spinning={loading}>
      <Row style={{ paddingTop: "10%" }}>
        <Col span={12} offset={7}>
          <Row>
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
                    Order Id :123123
                  </Title>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row style={{ marginBottom: "20px" }}>
            <Col span={18}>
              <Table
                dataSource={dataSource}
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
                <span style={{ color: "#FE724C" }}>Ship fee:</span> 10 USD
              </Title>
            </Col>
          </Row>

          <Row>
            <Col offset={1}>
              <Title level={5}>
                <span style={{ color: "#FE724C" }}>Total price:</span> 10 ETH
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
