import Footer from "rc-footer";
import "rc-footer/assets/index.css"; // import 'rc-footer/asssets/index.less';
import { render } from "react-dom";

const FoodterCustom = () => {
  return (
    <Footer
      bottom="Foodlive ©2022 ❤️ DuongPT & HuongNTT"
      theme="light"
      columnLayout="space-around"
    />
  );
};

export default FoodterCustom;
