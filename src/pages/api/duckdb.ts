import { NextApiRequest, NextApiResponse } from "next";
import {
    getDataFromResponse,
    defaultMiddlewareUrl,
    validateAddress,
} from "./_common";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let url = defaultMiddlewareUrl;
    const queryParams = req.query;
    let returnText = false;

    const serverUrl = queryParams.serverUrl as string;
    if (serverUrl && validateAddress(serverUrl)) url = serverUrl;
    url = `${url}/duckdb`; // Update to point to DuckDB API

    url = url + "?showMetadata=";
    if (queryParams.dts) {
        url = url + "&dts=";
        returnText = true;
    }

    try {
        let query = req.body as string;
        query = query.replace(/\s+/g, " ").trim();
        const body = {
            query,
            showMetadata: true, // Ensure metadata is included
        };

        const result = await getDataFromResponse<any>(
            url,
            JSON.stringify(body),
            "POST",
            returnText
        );

        res.status(200).json({
            data: returnText ? result : result.data,
            returnText,
            metadata: result.metadata,
        });
    } catch (error) {
        res.status(400).json({ error: "DuckDB query failed", details: error });
    }
}
