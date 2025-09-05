const http = require('http');
const fs = require('fs');
const path = require('path');

// Create HTTP server
const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Set default file to index.html
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Get file extension for content type
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };
    
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Read and serve the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 Not Found</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                margin: 0;
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            }
                            .error-container {
                                text-align: center;
                                padding: 2rem;
                                background: white;
                                border-radius: 10px;
                                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                            }
                            h1 { color: #333; }
                            p { color: #666; }
                            a {
                                display: inline-block;
                                margin-top: 1rem;
                                padding: 10px 20px;
                                background: #667eea;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="error-container">
                            <h1>404 - Page Not Found</h1>
                            <p>The requested resource could not be found.</p>
                            <a href="/">Go Home</a>
                        </div>
                    </body>
                    </html>
                `, 'utf-8');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Success - serve the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Server configuration
const PORT = process.env.PORT || 8591;
const HOST = '0.0.0.0';

// Start the server
server.listen(PORT, HOST, () => {
    console.log(`
╔════════════════════════════════════════════════════╗
║                                                    ║
║      🌐 HTTP Server Running Successfully! 🌐      ║
║                                                    ║
║     Local:    http://localhost:${PORT}              ║
║     Network:  http://${getLocalIP()}:${PORT}              ║
║                                                    ║
║     Press Ctrl+C to stop the server               ║
║                                                    ║
╚════════════════════════════════════════════════════╝
    `);
    
    if (PORT === 80) {
        console.log('\n📌 Access your site at: http://localhost (no port needed)');
    }
    console.log();
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Please try a different port.`);
    } else if (err.code === 'EACCES') {
        console.log(`Port ${PORT} requires elevated privileges.`);
        console.log('Try running with sudo: sudo node server.js');
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

// Helper function to get local IP address
function getLocalIP() {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '127.0.0.1';
}
