import * as OneSignal from "@onesignal/node-onesignal";

export const pushNotification = async ({
  name,
  enContent,
  arContent,
  extraData = {},
  playerIds = [], // array
}) => {
  if (playerIds.length < 1)
    throw new Error("Minimum one playerId is required!");

  playerIds = playerIds.map((ele) => ele.toString());

  const configuration = OneSignal.createConfiguration({
    userAuthKey: process.env.ONESIGNAL_USER_AUTH_KEY,
    restApiKey: process.env.ONESIGNAL_REST_API_KEY,
  });
  const client = new OneSignal.DefaultApi(configuration);

  const notification = new OneSignal.Notification();
  notification.app_id = process.env.ONESGINAL_APP_ID;
  notification.name = name;
  notification.contents = {
    en: enContent,
    ar: arContent,
    extraData,
  };
  // required for Huawei
  notification.headings = {
    en: enContent,
    ar: arContent,
    extraData,
  };

  notification.include_aliases = {
    external_id: playerIds,
  };
  notification.target_channel = "push";

  const { id } = await client.createNotification(notification);

  return id;
};
