import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_PRODUCTS} from "../gqlops/queries";
import Card from "../Components/Card";
const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  if (loading) return <h2>loading....</h2>;
  if (error) {
    console.log(error);
  }
  console.log(data.products.data);

return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {data.products.data.map(({ id, attributes }) => {
          return <Card id={id} attributes={attributes} key={id} />
        })}
      </div>
    </div>
  );
};

export default Home;
