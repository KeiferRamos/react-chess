import { gql } from "@apollo/client";

export const LOGIN = gql`
  query ($input: LoginInput!) {
    user(input: $input) {
      ... on Success {
        user {
          username
        }
        success
      }
      ... on Notification {
        message
        success
      }
    }
  }
`;
