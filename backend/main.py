from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from scanners.headers_scanner import scan_headers

from scanners.ssl_scanner import scan_ssl

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    url: str

@app.post("/scan")
def scan_website(data: ScanRequest):

    result = scan_headers(data.url)

    return result

@app.post("/scan")
def scan_website(data: ScanRequest):

    headers_result = scan_headers(data.url)

    ssl_result = scan_ssl(data.url)

    return {
        "headers": headers_result,
        "ssl": ssl_result
    }