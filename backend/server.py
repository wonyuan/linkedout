from flask import Flask, request, jsonify
from flask_cors import CORS
from database import 
from cohere_model import get_similarity_scores_about, get_similarity_sources

pref = ''

app=Flask(__name__)
cors = CORS(app)

@app.errorhandler(400)
def bad_request(e):
    return jsonify(e), 400


@app.route("/home", methods=["GET", "POST"])
def courses():
    # get all user data
    if request.method == 'GET':
        user_id = request.args.get('id')
        if user_id:
            course_id = request.args.get('course_id') # corresponds to course #
            if course_id:
                # retrieve details for individual course
                return {"userData": get_user_profile(pref, course_id)}
            else:
                # retrieve list of pure course names & term
                return {"courses": get_all_courses()}
        else:
            return bad_request("Missing user ID")
    elif request.method == 'POST':
        data = request.get_json()
        if data['id'] and data['course']:
            # update doc corresponding to data['course'] status with added or not added --> return doc updated
            update_status(data['course'], data['status'])
            return {"updated": "success"}
        else:
            return bad_request("Missing user ID and/or course ID")
        