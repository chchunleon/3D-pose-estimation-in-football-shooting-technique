/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVideoFile = /* GraphQL */ `
  query GetVideoFile($id: ID!) {
    getVideoFile(id: $id) {
      id
      uid
      name
      type
      webkitRelativePath
      lastModified
      size
      lastModifiedDate
      height
      shootingFoot
      createdAt
      updatedAt
    }
  }
`;
export const listVideoFiles = /* GraphQL */ `
  query ListVideoFiles(
    $filter: ModelVideoFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        uid
        name
        type
        webkitRelativePath
        lastModified
        size
        lastModifiedDate
        height
        shootingFoot
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
