async function startScan() {

    const url = document.getElementById("urlInput").value;

    const resultBox = document.getElementById("result");

    resultBox.innerText = "Scanning...";

    try {

        const response = await fetch("http://127.0.0.1:8000/scan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        resultBox.innerText = JSON.stringify(data, null, 2);

    } catch (error) {

        resultBox.innerText = "Error: " + error;

    }
}