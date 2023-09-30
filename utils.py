from flask_restful import abort
def abort_if_doesnt_exist(Class, id):
    obj = Class.query.filter_by(id=id).first()
    if not obj:
        abort (404, message="doesn't exist")

