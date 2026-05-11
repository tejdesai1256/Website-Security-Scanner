import socket
from urllib.parse import urlparse

# Common ports to scan
COMMON_PORTS = {
    21: "FTP",
    22: "SSH",
    25: "SMTP",
    53: "DNS",
    80: "HTTP",
    110: "POP3",
    143: "IMAP",
    443: "HTTPS",
    3306: "MySQL",
    8080: "HTTP-ALT"
}

def scan_ports(url):

    try:

        # Extract hostname
        hostname = urlparse(url).hostname

        open_ports = []

        # Scan ports
        for port, service in COMMON_PORTS.items():

            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

            sock.settimeout(1)

            result = sock.connect_ex((hostname, port))

            if result == 0:

                open_ports.append({
                    "port": port,
                    "service": service,
                    "status": "OPEN"
                })

            sock.close()

        return {
            "success": True,
            "open_ports": open_ports
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }