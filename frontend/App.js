const root = document.getElementById('root');

function handleSubmit(e) {
    e.preventDefault();
    const script = document.getElementById('script').value;
    fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script })
    })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'output.gds';
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
}

root.innerHTML = `
  <h1>GDSII Scripting Web App</h1>
  <form id="gds-form">
    <textarea id="script" rows="10" cols="50" placeholder="Enter your script here..."></textarea><br>
    <button type="submit">Generate GDSII</button>
  </form>
`;
document.getElementById('gds-form').addEventListener('submit', handleSubmit);
