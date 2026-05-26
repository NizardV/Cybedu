import { createReadStream, promises as fsPromises } from 'fs';
import { Readable } from 'stream';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Response } from 'express';

export class DownloadService {
    // Folder where downloadable files live (you can change it)
    private readonly basePath = join(dirname(fileURLToPath(import.meta.url)), 'files');

    /**
     * Prepare a readable stream for the requested file.
     * If the file doesn't exist, returns a text stream with a sample content.
     * Supports returning the correct mime-type for .apk (future).
     */
    async prepareStream(fileName = 'sample.txt'): Promise<{ stream: NodeJS.ReadableStream; size?: number; mime: string }> {
        const fullPath = join(this.basePath, fileName);

        try {
            const stat = await fsPromises.stat(fullPath);
            const stream = createReadStream(fullPath);
            const mime = fileName.endsWith('.apk') ? 'application/vnd.android.package-archive' : 'text/plain';
            return { stream, size: stat.size, mime };
        } catch {
            // File not found -> provide a simple text stream as fallback
            const sample = `This is a sample text file used for download.\nRequested: ${fileName}\n`;
            const stream = Readable.from([sample]);
            return { stream, mime: 'text/plain' };
        }
    }

    /**
     * Pipe the file stream to the provided Express response so the client
     * can download it as an attachment.
     */
    async download(res: Response, fileName = 'sample.txt'): Promise<void> {
        const { stream, size, mime } = await this.prepareStream(fileName);
        res.setHeader('Content-Type', mime);
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        if (size !== undefined) res.setHeader('Content-Length', String(size));
        // pipe the stream to the response; errors forwarded automatically by stream
        stream.pipe(res);
    }
}
