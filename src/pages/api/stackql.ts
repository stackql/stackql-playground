import { NextApiRequest, NextApiResponse } from "next";
import { getDataFromResponse, localMiddlewareUrl } from "./_common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `${localMiddlewareUrl}/stackql`;
  try {
    let query = req.body as string;
    query = query.replace(/\s+/g, " ").trim();
    const body = {
      query,
    };
    const result = await getDataFromResponse<any>(
      url,
      JSON.stringify(body),
      "POST"
    );
    console.log("result is %o", result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
