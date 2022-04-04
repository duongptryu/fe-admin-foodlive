import Template from "../../layout/layout";
import SubCategoryManager from "./categoryManager";

const CategoryManager = () => {
  return (
    <Template
      content={<SubCategoryManager />}
      title="Category Management"
    ></Template>
  );
};

export default CategoryManager;
