const aws = require('aws-sdk');
const naclDid = require('nacl-did');
const blake = require('blakejs');

const usersTable = 'Users'
const vcTable = 'VerifiableClaims'
const docClient = new aws.DynamoDB.DocumentClient()

class User {

  constructor(data) {
    this.data = data
  }

  async signVc (vc) {
    const identity = naclDid.loadIdentity(this.data.dids[0])
    const jwt = identity.createJWT(vc)
    
    vc.hash = blake.blake2bHex(jwt)
    vc.iss = identity.did
    vc.jwt = jwt

    const params = {
      TableName: vcTable,
      Item: vc
    }

    await docClient.put(params).promise()
    return vc
  }

  async getAllClaims () {
    const params = {
      TableName: vcTable,
      FilterExpression : '#s = :subject',
      ProjectionExpression: '#s,iss,jwt,claim',
      ExpressionAttributeNames: {'#s': 'sub'},
      ExpressionAttributeValues : {':subject' : this.data.dids[0].did}
    }
    const data = await docClient.scan(params).promise()
    return data.Items
  }
}



const getUser = async (type, uniqId) => {
  const data = await getOrCreateUserData(type, uniqId)
  return new User(data)
}

const getOrCreateUserData = async (type, uniqId) => {
  const params = {
    TableName: usersTable,
    AttributesToGet: ['uniqId', 'type', 'data', 'dids'],
    Key: {uniqId: uniqId}
  }

  const user = await docClient.get(params).promise()
  if (user.Item) {
    return user.Item
  } else {
    const Item = {
      uniqId,
      type,
      dids: [naclDid.createIdentity().toJSON()]
    }
    const params = {
      TableName: usersTable,
      Item
    }

    await docClient.put(params).promise()
    return Item
  }
}

module.exports = {
  getUser
}