import requests
from bs4 import BeautifulSoup

def scan_seo(url):

    try:

        response = requests.get(url, timeout=5)

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        # Title
        title = soup.title.string if soup.title else None

        # Meta Description
        meta_description = soup.find(
            "meta",
            attrs={"name": "description"}
        )

        # H1 tags
        h1_tags = soup.find_all("h1")

        # Images without alt
        images = soup.find_all("img")

        missing_alt = 0

        for img in images:

            if not img.get("alt"):

                missing_alt += 1

        return {
            "success": True,
            "title": title,
            "meta_description": (
                meta_description is not None
            ),
            "h1_count": len(h1_tags),
            "missing_alt_images": missing_alt
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }