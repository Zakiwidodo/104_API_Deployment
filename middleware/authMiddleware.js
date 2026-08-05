const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Cek jika header authorization tidak ada
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization header missing'
            });
        }

        // Memastikan format header dimulai dengan "Bearer "
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Invalid token format. Format must be "Bearer <token>"'
            });
        }

        // Mengambil token setelah kata 'Bearer '
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Token missing'
            });
        }

        // Verifikasi token dengan JWT_SECRET dari .env
        const secret = process.env.JWT_SECRET || 'secret_key_fallback';
        const decoded = jwt.verify(token, secret);

        // Menyimpan data user yang di-decode ke dalam objek request
        req.user = decoded;
        
        // Lanjut ke controller/middleware berikutnya
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};

module.exports = authMiddleware;