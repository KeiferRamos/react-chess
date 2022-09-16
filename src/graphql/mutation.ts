import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($input: CreateInput!) {
    createUser(input: $input) {
      message
      success
    }
  }
`;
