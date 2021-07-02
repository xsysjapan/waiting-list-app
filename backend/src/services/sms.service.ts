import AWS from "aws-sdk";
AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });
const snsClient = new AWS.SNS({ apiVersion: "2010-03-31" });
export class SmsService {
  public async sendMessage(phoneNumber: string, message: string) {
    const data = await snsClient
      .publish({
        Message: message,
        PhoneNumber: `81${
          phoneNumber.startsWith("0") ? phoneNumber.substring(1) : phoneNumber
        }`,
      })
      .promise();
    return data.MessageId;
  }
}
