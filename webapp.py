import base64

from flask import Flask
import mysql.connector

TEMPLATE="PCFET0NUWVBFIGh0bWw+PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxtZXRhIGNoYXJzZXQ9IlVURi04Ij48bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MSI+PHRpdGxlPkJvb3RzdHJhcCBUZW1wbGF0ZTwvdGl0bGU+PCEtLSBCb290c3RyYXAgQ1NTIC0tPjxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iaHR0cHM6Ly9zdGFja3BhdGguYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvNC41LjIvY3NzL2Jvb3RzdHJhcC5taW4uY3NzIj48L2hlYWQ+PGJvZHk+PGRpdiBjbGFzcz0iY29udGFpbmVyIj48bmF2IGNsYXNzPSJuYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBuYXZiYXItbGlnaHQgYmctbGlnaHQiPjxwIGNsYXNzPSJuYXZiYXItYnJhbmQiPkNvbXB1dGVyIFNjaWVuY2UgU3ByaW5nICcyNDwvcD48L25hdj48aDI+UHJvamVjdCBMaXN0aW5nPC9oMj48dGFibGUgY2xhc3M9InRhYmxlIj48dGhlYWQ+PHRyPjx0aCBzY29wZT0iY29sIj5JRDwvdGg+PHRoIHNjb3BlPSJjb2wiPlByb2plY3QgTmFtZTwvdGg+PHRoIHNjb3BlPSJjb2wiPkNvZGUgUmV2aWV3IERvbmU/PC90aD48dGggc2NvcGU9ImNvbCI+TkRBPzwvdGg+PC90cj48L3RoZWFkPjx0Ym9keT48IS0tICQkJHJvd3MkJCQgLS0+PC90Ym9keT48L3RhYmxlPjwvZGl2PjwhLS0gQm9vdHN0cmFwIEpTIC0tPjxzY3JpcHQgc3JjPSJodHRwczovL2NvZGUuanF1ZXJ5LmNvbS9qcXVlcnktMy41LjEuc2xpbS5taW4uanMiPjwvc2NyaXB0PjxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0Bwb3BwZXJqcy9jb3JlQDIuNS40L2Rpc3QvdW1kL3BvcHBlci5taW4uanMiPjwvc2NyaXB0PjxzY3JpcHQgc3JjPSJodHRwczovL3N0YWNrcGF0aC5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC80LjUuMi9qcy9ib290c3RyYXAubWluLmpzIj48L3NjcmlwdD48L2JvZHk+PC9odG1sPg=="

# Connect to MySQL
cnx = mysql.connector.connect(
    user="cs",
    password="ComputerScience!",
    database="cs24s"
)

def getData():

    # Create a cursor object
    cursor = cnx.cursor()

    # Execute SQL queries
    cursor.execute("SELECT * FROM project")

    # Get all rows from the result of the query
    rows = cursor.fetchall()
    # Convert rows into dictionary
    data = []
    for row in rows:
        data.append({
            "id": row[0],
            "project_name": row[1],
            "code_review_completed": "Yes" if row[2] else "No",
            "is_nda": "Yes" if row[3] else "No",
        })

    # Close the cursor and connection
    cursor.close()

    return data

def renderHtml(data):

    html_text = base64.b64decode(TEMPLATE).decode("utf-8")

    table_html = ""
    # Replace the placeholder with the actual data
    for row in data:
        table_html += f"<tr><td>{row['id']}</td><td>{row['project_name']}</td><td>{row['code_review_completed']}</td><td>{row['is_nda']}</td></tr>"

    html_text = html_text.replace("<!-- $$$rows$$$ -->", table_html)

    return html_text
app = Flask(__name__)

@app.route('/')
def hello():
    return renderHtml(getData())

if __name__ == '__main__':
    app.run(host="0.0.0.0")