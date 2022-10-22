import { useEffect, useState } from "react";
import { getMenuItems, GetMenuItemsResponse } from "../../services/menu";
import {
  CreateOrderPrivateProps,
  CreateOrderPublicProps,
} from "./CreateOrder.props";
import CreateOrderView from "./CreateOrder.view";

const CreateOrder = (props: CreateOrderPublicProps) => {
  const [generatedProps, setGeneratedProps] = useState<CreateOrderPrivateProps>(
    { items: [], rules: {} }
  );

  useEffect(() => {
    (async () => {
      const res: GetMenuItemsResponse = await getMenuItems();
      setGeneratedProps(res);
    })();
  }, []);

  return <CreateOrderView {...generatedProps} />;
};

export default CreateOrder;
