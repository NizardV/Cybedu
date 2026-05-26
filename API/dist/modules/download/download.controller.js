import { DownloadService } from './download.service.js';
export class DownloadController {
    downloadService;
    constructor(downloadService = new DownloadService()) {
        this.downloadService = downloadService;
    }
    getTextFile = async (req, res, next) => {
        try {
            const fileName = req.query.file ?? 'sample.txt';
            await this.downloadService.download(res, fileName);
        }
        catch (error) {
            next(error);
        }
    };
}
