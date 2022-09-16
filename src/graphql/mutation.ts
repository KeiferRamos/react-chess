import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($input: CreateInput!) {
    createUser(input: $input) {
      message
      success
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation ($input: CreateRoom!) {
    createRoom(input: $input) {
      message
    }
  }
`;
