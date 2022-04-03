import ReactApexChart from "react-apexcharts";
import { Typography, notification } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import API from "../../api/fetch";

function PieChart() {
  const { Title, Paragraph } = Typography;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [cate, setCate] = useState([]);

  const fetchDataOrder = () => {
    setLoading(true);
    API.get(`admin/stats/food`)
      .then((result) => {
        console.log(result.data.data);
        setValue(result.data.data.Food);
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

  const options = {
    chart: {
      type: "donut",
    },
    labels: cate,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <div className="linechart">
          <div style={{ marginBottom: "30px" }}>
            <Title level={5}>Food by Category</Title>
            {/* <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph> */}
          </div>
        </div>
        <ReactApexChart options={options} series={value} type="donut" />
      </div>
    </>
  );
}

export default PieChart;
