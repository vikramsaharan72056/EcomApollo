import { gql } from "@apollo/client";

export const GET_ALL_Products = gql`
  query getAllProducts {
    products {
      data {
        id
        attributes {
          Name
          Description
          Price
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($productId: ID) {
    product(id: $productId) {
      data {
        id
        attributes {
          Name
          Price
          Description
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
