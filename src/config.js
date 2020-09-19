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
    URL: "https://p1iihwl7si.execute-api.eu-west-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_tyumk149G",
    APP_CLIENT_ID: "5fq28fqda8haenl2n7t1tlivte",
    IDENTITY_POOL_ID: "eu-west-1:dda9478a-b246-44ec-8e93-04d6ebec0e16"
  }
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  ...config,
  // note that I could add config values common to both environments here
};