const dev = {
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://7jo25ctdrb.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_xXAqvbuK2",
    APP_CLIENT_ID: "b4rjmsacsglai67r650v8l72",
    IDENTITY_POOL_ID: "eu-west-1:de65c9b5-756f-4d8c-ad59-1ba07104c012"
  }
};

const prod = {
  apiGateway: {
    REGION: "eu-west-1",
    URL: "FIXhttps://gpl7ch4vu2.execute-api.eu-west-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "FIXeu-west-1_9CeByTnzD",
    APP_CLIENT_ID: "Fix1jf5l683kv8tfqcb317vqsnmq9",
    IDENTITY_POOL_ID: "FIXeu-west-1:960f9ae8-0a20-4323-9c8e-f34e621896b6"
  }
};
// TODO add the real prod values here once I've deployed to prod.

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  ...config,
  // note that I could add config values common to both environments here
};