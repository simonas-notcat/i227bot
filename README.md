# Idea 227 Bot

Portable reputation from existing communities

Built using [claudia-bot-builder](https://claudiajs.com/claudia-bot-builder.html).

## Architecture

### Data model

```typescript

enum UserType {
  slack = 'slack',
  telegram = 'telegram',
}

interface UserData {
  uniqId: string, // '{type}_{teamId}_{id}' - 'slack_TK3D9BBN2_UK189NHJ4'
  type: UserType, // 'slack'
  data: {
    id: string, // 'UK189NHJ4'
    name?: string, // 'simonas'
    teamId?: string,
  },
  defaultDid?: number,
  dids: Did[]
}

interface Did {
  did: string, // 'did:nacl:123456'
  privateKey?: string, 
}

interface VerifiableClaimData {
  iss: string, // 'did:nacl:123456'
  sub: string, // 'did:nacl:789012'
  iat: number, // 1555504254
  exp?: number, // 1555504254
  claim: object, // { skill: 'Developer' }
  jwt?: string, // raw data
}

```


### Definitions

```typescript

interface User {
  data: UserData
  signVerifiableClaim: (vc: VerifiableClaim) => VerifiableClaim
  getAllClaims: () => VerifiableClaim[]
}

interface UserManager {
  getOrCreateUser: (type: UserType, uniqueId: string) => User
  getUserByUniqId: (uniqId: string) => User
  createDid: () => Did
}

```