from flask import Blueprint, jsonify
import requests
from models.Course import db, Course

udemy_bp = Blueprint('udemy', __name__)

@udemy_bp.route('/api/import-courses', methods=['POST'])
def import_courses():
    url = "https://paid-udemy-course-for-free.p.rapidapi.com/"
    headers = {
        'x-rapidapi-key': "2a5fcb6cacmsh3b74197809858aep180f5ejsnd185175bebfd",
        'x-rapidapi-host': "paid-udemy-course-for-free.p.rapidapi.com"
    }
    params = {"page": 0}
    response = requests.get(url, headers=headers, params=params)
    data = response.json()

   
    for item in data:
        course = Course(
            id=item.get('id'),
            sku=item.get('sku'),
            pic=item.get('pic'),
            title=item.get('title'),
            coupon=item.get('coupon'),
            org_price=item.get('org_price'),
            description=item.get('desc_text'),
            category=item.get('category'),
            language=item.get('language'),
            platform=item.get('platform'),
            rating=item.get('rating', 0),
            duration=item.get('duration', 0),
            expiry=item.get('expiry'),
            savedtime=item.get('savedtime')
        )
       
        if not Course.query.get(course.id):
            db.session.add(course)
    db.session.commit()
    return jsonify({"message": "Courses imported!"}), 201