const dev = {
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://1bbg0ta46i.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_KdjbQBqhI",
    APP_CLIENT_ID: "7olb0smc1q1f5fnndpbjosa8gb",
    IDENTITY_POOL_ID: "eu-west-1:2e955709-9a75-4f6c-929c-018e1368930b"
  }
};

const prod = {
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://gpl7ch4vu2.execute-api.eu-west-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_9CeByTnzD",
    APP_CLIENT_ID: "1jf5l683kv8tfqcb317vqsnmq9",
    IDENTITY_POOL_ID: "eu-west-1:960f9ae8-0a20-4323-9c8e-f34e621896b6"
  }
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  ...config,
  // note that I could add config values common to both environments here
};