import { gql } from "@apollo/client";

export const LOGIN = gql`
  query ($input: LoginInput!) {
    user(input: $input) {
      ... on HasUser {
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

export const GET_ROOMS = gql`
  query {
    rooms {
      ... on HasRooms {
        rooms {
          name
          creator
          password
          id
        }
      }
      ... on Notification {
        message
        success
      }
    }
  }
`;
