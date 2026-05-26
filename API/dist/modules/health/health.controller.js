export class HealthController {
    status = (_req, res) => {
        res.json({ status: 'ok' });
    };
}
