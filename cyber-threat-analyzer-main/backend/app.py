# Initializes Flask app, sets up routes, database, and ML inference endpoint
from __init__ import create_app  
app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")  



