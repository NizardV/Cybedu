const fs = require('fs');
const os = require('os');
const path = require('path');

const LOGS_DIR =
  process.env.LOGS_DIR ||
  '/db/logs'; // default to container volume, overrideable for local dev
const LOG_FILE = path.join(LOGS_DIR, 'api.log');

const FACILITY = 16; // local0
const SYSLOG_VERSION = 1;
const APP_NAME = process.env.APP_NAME || 'api_mock';
const HOSTNAME = os.hostname();

// Ensure the target directory exists once on startup
fs.mkdirSync(LOGS_DIR, { recursive: true });

const escapeStructuredDataValue = (value) => {
  const stringValue = value === undefined || value === null ? '' : String(value);
  return stringValue
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/]/g, '\\]');
};

const formatStructuredData = (fields) => {
  const entries = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}="${escapeStructuredDataValue(value)}"`);

  if (!entries.length) {
    return '-';
  }

  return `[request@47450 ${entries.join(' ')}]`;
};

const severityFromStatus = (status) => {
  if (typeof status !== 'number') {
    return { code: 6, name: 'info' };
  }
  if (status >= 500) return { code: 3, name: 'error' };
  if (status >= 400) return { code: 4, name: 'warning' };
  if (status >= 300) return { code: 5, name: 'notice' };
  if (status >= 200) return { code: 6, name: 'info' };
  return { code: 7, name: 'debug' };
};

const normalizeIp = (ip) => {
  if (!ip) return 'unknown';
  return ip.replace(/^::ffff:/, '');
};

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    const forwardedIp = forwardedFor.split(',').map((part) => part.trim()).find(Boolean);
    if (forwardedIp) {
      return normalizeIp(forwardedIp);
    }
  }

  if (req.ip) {
    return normalizeIp(req.ip);
  }

  if (req.socket && req.socket.remoteAddress) {
    return normalizeIp(req.socket.remoteAddress);
  }

  return 'unknown';
};

const formatRfc5424Log = ({ timestamp, procId, msgId, structuredData, message, severity }) => {
  const isoTimestamp = timestamp.toISOString();
  const pri = FACILITY * 8 + severity;
  return `<${pri}>${SYSLOG_VERSION} ${isoTimestamp} ${HOSTNAME} ${APP_NAME} ${procId} ${msgId} ${structuredData} ${message}\n`;
};

const requestLogger = (req, res, next) => {
  const start = process.hrtime.bigint ? process.hrtime.bigint() : null;

  res.on('finish', () => {
    const durationMs =
      start !== null ? Number((process.hrtime.bigint() - start) / 1000000n) : undefined;
    const { code: severityCode, name: severityName } = severityFromStatus(res.statusCode);

    const structuredData = formatStructuredData({
      method: req.method,
      path: req.originalUrl || req.url,
      status: res.statusCode,
      ip: getClientIp(req),
      duration_ms: durationMs,
      severity: severityName,
    });

    const line = formatRfc5424Log({
      timestamp: new Date(),
      procId: process.pid,
      msgId: 'api-request',
      structuredData,
      message: `${req.method} ${req.originalUrl || req.url}`,
      severity: severityCode,
    });

    fs.appendFile(LOG_FILE, line, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to write request log', error);
      }
    });
  });

  next();
};

module.exports = requestLogger;
