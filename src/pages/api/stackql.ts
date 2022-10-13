import { NextApiRequest, NextApiResponse } from "next";
import { getDataFromResponse, middlewareUrl } from "./_common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `${middlewareUrl}/stackql`;
  try {
    let query = req.body as string;
    query = query.replace(/\s+/g, " ").trim();
    const body = {
      query,
      showMetadata: true,
    };
    const result = await getDataFromResponse<any>(
      url,
      JSON.stringify(body),
      "POST"
    );
    console.log("result is %o", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}
