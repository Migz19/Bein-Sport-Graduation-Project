// /pages/api/stream-video/[videoId].ts

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";

// const s3 = new S3Client({
//     region: process.env.AWS_REGION,
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//     },
//   });
const s3 = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: "AKIAT4GVRYMXWM337JLB",
      secretAccessKey: "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",
    },
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { videoId } = req.query;
  const range = req.headers.range;

  if (!videoId || typeof videoId !== "string") {
    return res.status(400).send("Invalid video ID");
  }

  const bucket = "gp2025";
  const key = `processed_videos/${videoId}.mp4`; // Adjust if your S3 key format is different

  try {
    // First, get the object's metadata (like file size)
    const head = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );

    const fileSize = Number(head.ContentLength);
    if (!range) {
      // No range header = full download
      const full = await s3.send(
        new GetObjectCommand({ Bucket: bucket, Key: key })
      );
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      });
      full.Body?.pipe(res);
    } else {
      // Partial request (video streaming)
      const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
      const start = parseInt(startStr, 10);
      const end = endStr ? parseInt(endStr, 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const stream = await s3.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: key,
          Range: `bytes=${start}-${end}`,
        })
      );

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      });

      stream.Body?.pipe(res);
    }
  } catch (err: any) {
    console.error("S3 streaming error:", err);
    res.status(500).send("Failed to stream video");
  }
}
