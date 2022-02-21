import { gql } from "apollo-server";

export default gql`
  scalar Date
  scalar Data
  "a mongoose Document"
  interface Document {
    "mongoose ObjectId"
    _id: ID!
  }
  type Response {
    ok: Boolean!
    data: Data
  }
  "base properties of every Document in Collection 'Item'"
  input Jwt {
    email: String!
    name: String
    picture: String
  }
  interface Item {
    tags: [String!]!
    name: String!
    desc: String
    parent: ID
    children: [ID!]!
  }
  "a hardcover book, pdf, movie, youtube video, ..."
  type Media {
    contentTags: [String!]!
    contentDesc: String
    subTitle: String
    creators: [String!]!
    publisher: String
    language: String
    publishedDate: Date
  }
  input MediaData {
    contentTags: [String!]!
    contentDesc: String
    subTitle: String
    creators: [String!]!
    publisher: String
    language: String
    publishedDate: Date
  }
  "can be borrowed by users with the BORROW_BOOKS or MANAGE_BOOKS perm"
  type Rentable {
    ownershipStateTags: [String!]!
    borrowedDate: Date
    dueDate: Date
  }
  # union Book = Item | Media | Rentable
  # type Book implements Item {}

  "composed of Item, Media, Rentable, Document"
  type Book implements Item & Document {
    _id: ID!
    tags: [String!]!
    name: String!
    desc: String
    "mongoose ObjectId"
    parent: ID
    "mongoose ObjectId[]"
    children: [ID!]!

    media: Media!
    rentable: Rentable!
  }
  input BookData {
    tags: [String]
    name: String
    desc: String

    media: MediaData
  }
  type User implements Item & Document {
    _id: ID!
    tags: [String!]!
    name: String!
    desc: String
    parent: ID
    children: [ID!]!

    childrenObjects: [Book!]!
  }
  input UserData {
    email: String
    tags: [String!]
    name: String
    desc: String
  }
`;
