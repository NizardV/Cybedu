export const errorHandler = (error, _req, res, _next) => {
    console.error(error);
    if (error instanceof Error) {
        res.status(500).json({ message: error.message });
        return;
    }
    res.status(500).json({ message: 'Unexpected error' });
};
