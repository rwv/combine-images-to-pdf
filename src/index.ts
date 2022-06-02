import PDFDocument from "pdfkit/js/pdfkit.esnext.js";
import blobStream from "blob-stream";

export async function combineImagesToPDF(
  pageInfos: { blob: Blob; width: number; height: number }[]
): Promise<Blob> {
  // create a document the same way as above
  const doc = new PDFDocument({ autoFirstPage: false });

  // pipe the document to a blob
  const stream = doc.pipe(blobStream());

  const pdfBlobPromise = new Promise((resolve) => {
    stream.on("finish", function () {
      // get a blob you can do whatever you like with
      const blob = stream.toBlob("application/pdf");
      resolve(blob);
    });
  }) as Promise<Blob>;

  for (const pageInfo of pageInfos) {
    const { blob, width, height } = pageInfo;
    doc.addPage({ size: [width, height] });
    const url = URL.createObjectURL(blob);
    // @ts-ignore
    doc.image(url, 0, 0, { width, height });
  }

  doc.end();

  return await pdfBlobPromise;
}
