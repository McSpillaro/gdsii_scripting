from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import gdstk
import os

app = Flask(__name__)
CORS(app)

OUTPUT_DIR = "../output"

@app.route('/generate', methods=['POST'])
def generate_gds():
    data = request.json
    script = data.get('script', '')
    # TODO: Parse and execute the script to generate GDSII/OASIS
    # For now, create a dummy GDSII file
    lib = gdstk.Library()
    cell = lib.new_cell('CELL')
    cell.rectangle((0, 0), (10, 10))
    output_path = os.path.join(OUTPUT_DIR, 'output.gds')
    lib.write_gds(output_path)
    return send_file(output_path, as_attachment=True)

@app.route('/')
def index():
    return jsonify({"message": "Backend is running."})

if __name__ == '__main__':
    app.run(debug=True)
