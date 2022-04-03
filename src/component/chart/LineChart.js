import ReactApexChart from "react-apexcharts";
import { Typography, notification } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import API from "../../api/fetch";

function LineChart() {
  const { Title, Paragraph } = Typography;
  const [loading, setLoading] = useState(false);
  const [momoOrder, setMomoOrder] = useState([]);
  const [cryptoOrder, setCryptoOrder] = useState([]);
  const [cate, setCate] = useState([]);

  const fetchDataOrder = () => {
    setLoading(true);
    API.get(`admin/stats/order`)
      .then((result) => {
        console.log(result.data.data);
        setMomoOrder(result.data.data.Momo);
        setCryptoOrder(result.data.data.Crypto);
        setCate(result.data.data.Cate);
      })
      .catch((e) => {
        notification["error"]({
          message: "Error server",
          description: e,
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);

  const series = [
    {
      name: "Momo Order",
      data: momoOrder,
      offsetY: 0,
    },
    {
      name: "Crypto Order",
      data: cryptoOrder,
      offsetY: 0,
    },
  ];

  const options = {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: cate,
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Orders</Title>
          {/* <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph> */}
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Momo Order</li>
            <li>{<MinusOutlined />} Crypto Order</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={options}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
