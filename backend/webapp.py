import json

from flask import Flask, request
import mysql.connector

# Connect to MySQL
cnx = mysql.connector.connect(
    user="cs",
    password="ComputerScience!",
    database="cs24s"
)

def getAllRecords():

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
            "code_review_completed": True if row[2] else False,
            "is_nda": True if row[3] else False,
        })

    # Close the cursor and connection
    cursor.close()

    return data

def getOneRecord(project_id: int):
    cursor = cnx.cursor()
    cursor.execute(f"SELECT * FROM project WHERE id={project_id}")
    row = cursor.fetchone()
    cursor.close()
    return row

app = Flask(__name__)

@app.after_request
def apply_global_headers(response):
    # If we do not have these headers, the browser will reject the API calls.
    response.headers["Generated-By"] = f"CS/1.0"
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

@app.route('/api/v1/projects')
def get_projects():
    return getAllRecords()

@app.route('/api/v1/projects/<int:project_id>/code_review', methods=['POST'])
def toggleCodeReview(project_id: int):

    # Get individual record
    rec = getOneRecord(project_id)
    if rec is None:
        return "", 404 # 404 error, no such project.
    
    newValue = 1 if rec[2] == 0 else 0
    # Create update query
    cursor = cnx.cursor()
    cursor.execute(f"UPDATE project SET code_review_completed={newValue} WHERE id={project_id}")
    cnx.commit()
    cursor.close()
    return "", 202

@app.route('/api/v1/projects/<int:project_id>/nda', methods=['POST'])
def toggleNda(project_id: int):

    # Get individual record
    rec = getOneRecord(project_id)
    if rec is None:
        return "", 404 # 404 error, no such project.
    
    newValue = 1 if rec[3] == 0 else 0
    # Create update query
    cursor = cnx.cursor()
    cursor.execute(f"UPDATE project SET is_nda={newValue} WHERE id={project_id}")
    cnx.commit()
    cursor.close()
    return "", 202

@app.route("/api/v1/projects/<int:project_id>",methods=['DELETE'])
def deleteProject(project_id: int):
    
    # Get individual record
    rec = getOneRecord(project_id)
    if rec is None:
        return "", 404 # 404 error, no such project.
    
    # Create delete query
    cursor = cnx.cursor()
    cursor.execute(f"DELETE FROM project WHERE id={project_id}")
    cnx.commit()
    cursor.close()
    return "", 204

@app.route("/api/v1/project", methods=['PUT'])
def newProject():
    # get the request body
    projectData = json.loads(request.data)

    cursor = cnx.cursor()
    cursor.execute(f"INSERT INTO project (project_name, code_review_completed, is_nda) VALUES ('{projectData['project_name']}', 0, {1 if projectData['is_nda'] else 0})")
    cnx.commit()
    cursor.close()
    return "", 201

if __name__ == '__main__':
    app.run(host="0.0.0.0")