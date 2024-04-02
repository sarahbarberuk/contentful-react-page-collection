import "./App.css";
import { Suspense } from "react";

const query = `
{
  productCollection {
    items {
			description
      imageUrl {   
        url
      }
    }
  }
}
`;

const response = await fetch(
  `https://graphql.contentful.com/content/v1/spaces/<space_id>/`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: "Bearer <API_TOKEN>",
    },
    //send the GraphQL query
    body: JSON.stringify({ query }),
  }
);

const data = await response.json();

if (!response.ok) {
  throw new Error("error");
}

const App = () => {
  return (
    <Suspense fallback={<p>Fetching products...</p>}>
      <ProductCollection />
    </Suspense>
  );
};

const ProductCollection = () => {
  const products = data.data.productCollection.items;
  const listItems = products.map((product) => (
    <li>
      <img src={product.imageUrl.url} width="200" height="200" />
      <p>{product.description}</p>
    </li>
  ));
  return <ul>{listItems}</ul>;
};

export default App;
