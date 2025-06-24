from flask import Blueprint, jsonify, request
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
    page = 0
    total_imported = 0

    while True:
        params = {"page": page}
        response = requests.get(url, headers=headers, params=params)
        data = response.json()

        
        if not data:
            break

        for item in data:
            existing_course = Course.query.get(item.get('id'))
            if not existing_course:
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
                db.session.add(course)
                total_imported += 1
        db.session.commit()
        page += 1 
    return jsonify({"message": f"Courses imported successfully! Total imported: {total_imported}"}), 201

@udemy_bp.route('/api/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    result = []
    for course in courses:
        result.append({
            "id": course.id,
            "sku": course.sku,
            "pic": course.pic,
            "title": course.title,
            "coupon": course.coupon,
            "org_price": course.org_price,
            "description": course.description,
            "category": course.category,
            "language": course.language,
            "platform": course.platform,
            "rating": course.rating,
            "duration": course.duration,
            "expiry": course.expiry,
            "savedtime": course.savedtime
        })
    return jsonify(result)

@udemy_bp.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get_or_404(course_id)
    return jsonify({
        "id": course.id,
        "sku": course.sku,
        "pic": course.pic,
        "title": course.title,
        "coupon": course.coupon,
        "org_price": course.org_price,
        "description": course.description,
        "category": course.category,
        "language": course.language,
        "platform": course.platform,
        "rating": course.rating,
        "duration": course.duration,
        "expiry": course.expiry,
        "savedtime": course.savedtime
    })



@udemy_bp.route('/api/courses', methods=['POST'])

def create_course():
    data = request.get_json()
    if not data or not data.get('title') or not data.get('org_price') or not data.get('description'):
        return jsonify({"message": "Title, original price, and description are required."}), 400

    new_course = Course(

        sku=data.get('sku'),
        pic=data.get('pic'),
        title=data.get('title'),
        coupon=data.get('coupon'),
        org_price=data.get('org_price'),
        description=data.get('description'),
        category=data.get('category'),
        language=data.get('language'),
        platform=data.get('platform'),
        rating=data.get('rating', 0.0), 
        duration=data.get('duration', 0.0), 
        expiry=data.get('expiry'),
        savedtime=data.get('savedtime') 
    )
    db.session.add(new_course)
    db.session.commit()
    return jsonify({"message": "Course created successfully!", "course_id": new_course.id}), 201

@udemy_bp.route('/api/courses/<int:course_id>', methods=['PUT'])

def update_course(course_id):
    course = Course.query.get_or_404(course_id)
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided for update."}), 400

    course.sku = data.get('sku', course.sku)
    course.pic = data.get('pic', course.pic)
    course.title = data.get('title', course.title)
    course.coupon = data.get('coupon', course.coupon)
    course.org_price = data.get('org_price', course.org_price)
    course.description = data.get('description', course.description)
    course.category = data.get('category', course.category)
    course.language = data.get('language', course.language)
    course.platform = data.get('platform', course.platform)
    course.rating = data.get('rating', course.rating)
    course.duration = data.get('duration', course.duration)
    course.expiry = data.get('expiry', course.expiry)
  

    db.session.commit()
    return jsonify({"message": "Course updated successfully!"}), 200

@udemy_bp.route('/api/courses/<int:course_id>', methods=['DELETE'])

def delete_course(course_id):
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({"message": "Course deleted successfully!"}), 200

@udemy_bp.route('/api/admin-panel', methods=['GET'])

def admin_panel():
    return jsonify({
        "message": "Welcome, admin!",
        "courses_count": Course.query.count()
    })