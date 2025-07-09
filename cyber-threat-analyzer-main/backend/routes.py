# Defines REST API routes for the Threat Intelligence Dashboard (Flask backend)
from flask import Blueprint, jsonify, request
from models import Threat, db
from ml import predictor  # 🔍 ML prediction helper

bp = Blueprint('routes', __name__)

# ------------------- GET /api/threats -------------------
@bp.route('/api/threats', methods=['GET'])
def get_threats():
    """Returns paginated, filtered, searchable list of threats."""
    try:
        page = max(int(request.args.get('page', 1)), 1)
    except ValueError:
        page = 1

    try:
        limit = max(int(request.args.get('limit', 10)), 1)
    except ValueError:
        limit = 10

    category = request.args.get('category')
    search = request.args.get('search')

    query = Threat.query
    if category:
        query = query.filter(Threat.category.ilike(f'%{category}%'))
    if search:
        query = query.filter(Threat.description.ilike(f'%{search}%'))

    threats = query.paginate(page=page, per_page=limit, error_out=False)

    return jsonify({
        'total': threats.total,
        'page': page,
        'limit': limit,
        'data': [t.to_dict() for t in threats.items]
    })


# ------------------- GET /api/threats/<id> -------------------
@bp.route('/api/threats/<int:threat_id>', methods=['GET'])
def get_threat_by_id(threat_id):
    """Returns a single threat by ID."""
    threat = Threat.query.get(threat_id)
    if not threat:
        return jsonify({'error': 'Threat not found'}), 404
    return jsonify(threat.to_dict())


# ------------------- GET /api/threats/stats -------------------
@bp.route('/api/threats/stats', methods=['GET'])
def get_threat_stats():
    """Returns statistics: total threats, counts by category and severity."""
    total = Threat.query.count()

    categories = db.session.query(Threat.category, db.func.count()).group_by(Threat.category).all()
    severities = db.session.query(Threat.severity, db.func.count()).group_by(Threat.severity).all()

    return jsonify({
        'total_threats': total,
        'categories': {cat: count for cat, count in categories},
        'severities': {sev: count for sev, count in severities}
    })


# ------------------- POST /api/analyze -------------------
@bp.route('/api/analyze', methods=['POST'])
def analyze_threat():
    """Predicts the threat category for a new description using ML model."""
    data = request.get_json()

    if not data or 'description' not in data:
        return jsonify({'error': 'Missing \"description\" field'}), 400

    try:
        predicted = predictor.predict_threat_category(data['description'])
        return jsonify({'predicted_category': predicted})
    except Exception as e:
        return jsonify({'error': str(e)}), 500




